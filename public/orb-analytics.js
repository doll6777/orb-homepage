(function () {
  'use strict';

  // This first-party guard must run before any Google script is requested.
  if (window.orbAnalytics) return;

  var productionHost = 'orbclinic.pages.dev';
  var storageKey = 'orb.analytics.internal.v1';
  var script = document.currentScript;
  var measurementId = script && script.getAttribute('data-measurement-id');
  var validId = /^G-[A-Z0-9]+$/.test(measurementId || '');
  var disableKey = 'ga-disable-' + measurementId;
  var started = false;
  var enabled = false;
  var storageFailed = false;
  var storageWriteFailed = false;

  function readInternal() {
    try {
      var internal = window.localStorage.getItem(storageKey) === '1';
      storageFailed = false;
      return internal;
    } catch {
      storageFailed = true;
      return false;
    }
  }

  function excludedPath(pathname) {
    var path;
    try {
      path = decodeURIComponent(pathname);
    } catch {
      return true;
    }
    return /^\/(?:internal-traffic|admin|design-system)(?:\/|$)/.test(path);
  }

  function status(url) {
    var current = url || new URL(window.location.href);
    var internal = readInternal();
    var reason = 'enabled';
    if (!validId) reason = 'invalid-id';
    else if (current.hostname !== productionHost || current.protocol !== 'https:') {
      reason = 'non-production-host';
    } else if (excludedPath(current.pathname)) reason = 'excluded-route';
    else if (storageFailed || storageWriteFailed) reason = 'storage-unavailable';
    else if (internal) reason = 'internal';
    return {
      enabled: reason === 'enabled' && enabled,
      eligible: reason === 'enabled' || reason === 'internal',
      internal: internal,
      reason: reason,
    };
  }

  function notify(name) {
    window.dispatchEvent(new CustomEvent(name, { detail: status() }));
  }

  function start() {
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    // Keep GA's automatic pageviews. A manual history page_view would duplicate
    // enhanced measurement when that setting is enabled in the GA property.
    window.gtag('config', measurementId);
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    tag.addEventListener('load', installHistoryGuards);
    document.head.appendChild(tag);
  }

  function evaluate(url) {
    var state = status(url);
    enabled = state.reason === 'enabled';
    window[disableKey] = !enabled;
    if (enabled) start();
    notify('orb-analytics-status');
    return enabled;
  }

  function disableBefore(url) {
    if (status(url).reason !== 'enabled') {
      enabled = false;
      window[disableKey] = true;
    }
  }

  function installHistoryGuards() {
    ['pushState', 'replaceState'].forEach(function (name) {
      var original = window.history[name];
      if (original.orbAnalyticsGuard) return;
      var guarded = function () {
        var target;
        try {
          target = arguments[2] == null
            ? new URL(window.location.href)
            : new URL(String(arguments[2]), window.location.href);
          disableBefore(target);
          var result = original.apply(this, arguments);
          evaluate();
          return result;
        } catch (error) {
          evaluate();
          throw error;
        }
      };
      guarded.orbAnalyticsGuard = true;
      window.history[name] = guarded;
    });
  }

  function classify(url) {
    if (url.protocol === 'tel:') return 'phone';
    if (url.protocol !== 'https:') return null;
    if (url.hostname === 'booking.naver.com' || url.hostname === 'm.booking.naver.com') {
      return 'booking';
    }
    if (url.hostname === 'pf.kakao.com') return 'kakao_chat';
    if (url.hostname === 'map.naver.com' || url.hostname === 'pcmap.place.naver.com' ||
        url.hostname === 'm.place.naver.com' || url.hostname === 'map.kakao.com' ||
        url.hostname === 'maps.google.com' || url.hostname === 'maps.app.goo.gl' ||
        (url.hostname === 'www.google.com' && /^\/maps(?:\/|$)/.test(url.pathname))) {
      return 'map';
    }
    return null;
  }

  function handleClick(event) {
    if (event.defaultPrevented || (event.button != null && event.button !== 0)) return;
    var target = event.target;
    if (target && !target.closest) target = target.parentElement;
    var link = target && target.closest && target.closest('a[href]');
    if (!link) return;
    var destination;
    try {
      destination = new URL(link.getAttribute('href'), window.location.href);
    } catch {
      return;
    }

    var changesThisPage = !event.metaKey && !event.ctrlKey && !event.shiftKey &&
      !event.altKey && !link.hasAttribute('download') &&
      (!link.target || link.target === '_self');
    if (changesThisPage && destination.origin === window.location.origin &&
        excludedPath(destination.pathname)) {
      disableBefore(destination);
      // If another handler cancels navigation, restore the current page's state.
      queueMicrotask(function () {
        if (event.defaultPrevented) evaluate();
      });
      return;
    }

    if (!evaluate()) return;
    var type = classify(destination);
    if (!type) return;
    window.gtag('event', type + '_click', {
      send_to: measurementId,
      cta_type: type,
      destination_host: destination.hostname || 'telephone',
    });
  }

  window.orbAnalytics = Object.freeze({
    status: function () { return status(); },
    isInternal: readInternal,
    setInternal: function (value) {
      // Stop collection immediately, including if persistence is unavailable.
      enabled = false;
      window[disableKey] = true;
      try {
        if (value) window.localStorage.setItem(storageKey, '1');
        else window.localStorage.removeItem(storageKey);
      } catch {
        storageWriteFailed = true;
        notify('orb-analytics-status');
        return false;
      }
      storageWriteFailed = false;
      evaluate();
      return true;
    },
  });

  // Register guards before loading GA so capture/popstate run before its hooks.
  document.addEventListener('click', handleClick, true);
  installHistoryGuards();
  window.addEventListener('popstate', function () { evaluate(); });
  window.addEventListener('pageshow', function () { evaluate(); });
  window.addEventListener('storage', function (event) {
    if (event.key === storageKey || event.key === null) evaluate();
  });
  if (window.navigation) {
    window.navigation.addEventListener('navigate', function (event) {
      disableBefore(new URL(event.destination.url));
    });
  }
  evaluate();
  notify('orb-analytics-ready');
})();
