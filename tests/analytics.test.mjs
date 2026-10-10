import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../public/orb-analytics.js', import.meta.url), 'utf8');
const measurementId = 'G-J9Z8BXQGKQ';
const internalKey = 'orb.analytics.internal.v1';

function fixture({ url = 'https://orbclinic.pages.dev/', internal = false, storageBlocked = false, id = measurementId } = {}) {
  const listeners = { document: new Map(), window: new Map() };
  const scripts = [];
  const microtasks = [];
  const storage = new Map(internal ? [[internalKey, '1']] : []);
  let storageWriteBlocked = false;
  let location = new URL(url);
  function add(surface, name, handler) {
    const entries = listeners[surface].get(name) || [];
    entries.push(handler);
    listeners[surface].set(name, entries);
  }
  function dispatch(surface, name, event = {}) {
    for (const callback of listeners[surface].get(name) || []) callback(event);
  }
  const document = {
    currentScript: { getAttribute: () => id },
    head: { appendChild: (node) => scripts.push(node) },
    createElement: () => ({ addEventListener(name, callback) { this[name] = callback; } }),
    addEventListener: (name, callback) => add('document', name, callback),
  };
  const window = {
    get location() { return location; },
    localStorage: {
      getItem(key) {
        if (storageBlocked) throw new Error('Storage blocked');
        return storage.get(key) ?? null;
      },
      setItem(key, value) {
        if (storageBlocked || storageWriteBlocked) throw new Error('Storage write failed');
        storage.set(key, value);
      },
      removeItem(key) {
        if (storageBlocked || storageWriteBlocked) throw new Error('Storage write failed');
        storage.delete(key);
      },
    },
    history: {
      pushState(_state, _unused, next) { if (next != null) location = new URL(next, location); },
      replaceState(_state, _unused, next) { if (next != null) location = new URL(next, location); },
    },
    addEventListener: (name, callback) => add('window', name, callback),
    dispatchEvent: (event) => dispatch('window', event.type, event),
  };
  const context = vm.createContext({
    window, document, URL, Date,
    CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } },
    queueMicrotask: (callback) => microtasks.push(callback),
  });
  function run() { vm.runInContext(source, context); }
  function click(href, options = {}) {
    const anchor = {
      target: options.target || '',
      getAttribute: () => href,
      hasAttribute: (attribute) => attribute === 'download' && Boolean(options.download),
      closest: () => anchor,
    };
    const event = {
      target: options.innerSvg ? { closest: () => anchor } : anchor,
      button: 0,
      defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; },
      ...options,
    };
    if (options.textNode) event.target = { parentElement: anchor };
    dispatch('document', 'click', event);
    return event;
  }
  run();
  return {
    window, document, scripts, storage, listeners, click, dispatch, run,
    calls: () => Array.from(window.dataLayer || [], (args) => Array.from(args)),
    events: () => Array.from(window.dataLayer || [], (args) => Array.from(args)).filter((args) => args[0] === 'event'),
    setLocation: (next) => { location = new URL(next, location); },
    blockStorageWrites: () => { storageWriteBlocked = true; },
    flushMicrotasks: () => { while (microtasks.length) microtasks.shift()(); },
  };
}

test('only the exact production HTTPS host can request Google Analytics', () => {
  for (const url of [
    'http://localhost:3000/', 'http://127.0.0.1:3000/',
    'https://preview.orbclinic.pages.dev/', 'https://orbclinic-renewal.pages.dev/',
    'https://orbclinic.pages.dev.attacker.example/',
    'https://orb-korean-medicine-clinic.hyeranlee.chatgpt.site/',
    'http://orbclinic.pages.dev/',
  ]) {
    const app = fixture({ url });
    assert.equal(app.scripts.length, 0, url);
    assert.equal(app.calls().length, 0, url);
    assert.equal(app.window.orbAnalytics.status().reason, 'non-production-host', url);
  }
  const app = fixture();
  assert.equal(app.scripts.length, 1);
  assert.equal(app.scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
});

test('excluded routes never load Google on their initial render', () => {
  for (const pathname of ['/internal-traffic', '/internal-traffic/', '/admin', '/admin/columns', '/design-system', '/design-system/example', '/%61dmin/columns']) {
    const app = fixture({ url: `https://orbclinic.pages.dev${pathname}?patient=secret` });
    assert.equal(app.scripts.length, 0, pathname);
    app.click('https://booking.naver.com/booking/16/bizes/1731406');
    assert.equal(app.events().length, 0, pathname);
    assert.equal(app.window.orbAnalytics.status().reason, 'excluded-route', pathname);
  }
});

test('internal browsers and unavailable storage fail closed before loading Google', () => {
  for (const options of [{ internal: true }, { storageBlocked: true }, { id: 'invalid' }]) {
    const app = fixture(options);
    assert.equal(app.scripts.length, 0);
    assert.equal(app.window.orbAnalytics.status().enabled, false);
    app.click('tel:0269595982');
    assert.equal(app.events().length, 0);
  }
});

test('persistent browser opt-out immediately disables collection and can be reversed', () => {
  const app = fixture();
  assert.equal(app.window.orbAnalytics.setInternal(true), true);
  assert.equal(app.storage.get(internalKey), '1');
  assert.equal(app.window[`ga-disable-${measurementId}`], true);
  app.click('tel:0269595982');
  assert.equal(app.events().length, 0);
  assert.equal(app.window.orbAnalytics.setInternal(false), true);
  assert.equal(app.storage.has(internalKey), false);
  app.click('tel:0269595982');
  assert.equal(app.events().length, 1);
  assert.equal(app.scripts.length, 1);
  assert.equal(app.calls().filter(([command]) => command === 'config').length, 1);
});

test('a failed opt-out write stays disabled even when storage reads still work', () => {
  const app = fixture();
  app.blockStorageWrites();
  assert.equal(app.window.orbAnalytics.setInternal(true), false);
  assert.equal(app.window.orbAnalytics.status().reason, 'storage-unavailable');
  app.click('tel:0269595982');
  assert.equal(app.events().length, 0);
  assert.equal(app.window[`ga-disable-${measurementId}`], true);
});

test('the management page can save a preference without starting analytics', () => {
  const app = fixture({ url: 'https://orbclinic.pages.dev/internal-traffic', internal: true });
  assert.equal(app.window.orbAnalytics.setInternal(false), true);
  assert.equal(app.scripts.length, 0);
  assert.equal(app.window.orbAnalytics.status().enabled, false);
  app.window.history.pushState({}, '', '/');
  assert.equal(app.scripts.length, 1);
  assert.equal(app.window.orbAnalytics.status().enabled, true);
});

test('one delegated handler tracks current and future links without motion dependencies', () => {
  const app = fixture();
  app.run();
  app.click('https://m.booking.naver.com/booking/16/bizes/1731406?condition=secret', { innerSvg: true });
  app.click('tel:0269595982', { textNode: true, detail: 0 });
  app.click('https://pf.kakao.com/_nXGxaX/chat?message=private');
  app.click('https://map.naver.com/p/entry/place/2005324011');
  assert.equal(app.listeners.document.get('click').length, 1);
  assert.equal(app.scripts.length, 1);
  assert.deepEqual(app.events().map((entry) => entry[1]), ['booking_click', 'phone_click', 'kakao_chat_click', 'map_click']);
  assert.deepEqual(Object.keys(app.events()[0][2]).sort(), ['cta_type', 'destination_host', 'send_to']);
  assert.equal(JSON.stringify(app.events()).includes('secret'), false);
  assert.equal(JSON.stringify(app.events()).includes('private'), false);
  assert.equal(JSON.stringify(app.events()).includes('0269595982'), false);
});

test('English booking guidance is not counted as an external booking conversion', () => {
  const app = fixture({ url: 'https://orbclinic.pages.dev/en' });
  for (const href of [
    '/en/first-visit#booking',
    'https://orbclinic.pages.dev/en/first-visit#booking',
  ]) {
    assert.equal(app.click(href).defaultPrevented, false);
  }
  app.setLocation('/en/first-visit');
  assert.equal(app.click('#booking', { detail: 0 }).defaultPrevented, false);
  assert.equal(app.events().length, 0);
  assert.equal(app.window.orbAnalytics.status().enabled, true);

  app.click('https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple');
  assert.deepEqual(app.events().map((entry) => entry[1]), ['booking_click']);
});

test('international phone links on English pages record one phone event without the number', () => {
  for (const route of ['/en', '/en/first-visit']) {
    const app = fixture({ url: `https://orbclinic.pages.dev${route}` });
    const event = app.click('tel:+82269595982', { detail: 0 });
    assert.equal(event.defaultPrevented, false);
    assert.equal(app.events().length, 1);
    const [, name, payload] = app.events()[0];
    assert.equal(name, 'phone_click');
    assert.equal(payload.cta_type, 'phone');
    assert.equal(payload.destination_host, 'telephone');
    assert.deepEqual(Object.keys(payload).sort(), ['cta_type', 'destination_host', 'send_to']);
    assert.equal(JSON.stringify(app.events()).includes('82269595982'), false);
  }
});

test('English booking and international phone links still respect analytics exclusions', () => {
  for (const options of [
    { url: 'https://orbclinic.pages.dev/en/first-visit', internal: true },
    { url: 'https://preview.orbclinic.pages.dev/en/first-visit' },
  ]) {
    const app = fixture(options);
    app.click('/en/first-visit#booking');
    app.click('tel:+82269595982');
    app.click('https://m.booking.naver.com/booking/16/bizes/1731406');
    assert.equal(app.events().length, 0);
    assert.equal(app.scripts.length, 0);
  }
});

test('classification requires exact known hosts and permitted protocols', () => {
  const app = fixture();
  for (const href of [
    '/sitemap', '/column/map-therapy', 'https://example.com/?next=booking.naver.com',
    'https://booking.naver.com.attacker.example/', 'https://attacker.example/pf.kakao.com',
    'javascript:alert("booking.naver.com")', 'http://booking.naver.com/',
    'https://www.google.com/search?q=map', 'mailto:booking.naver.com@example.com',
  ]) app.click(href);
  assert.equal(app.events().length, 0);
  for (const href of [
    'https://booking.naver.com/booking/16/bizes/1731406',
    'https://pcmap.place.naver.com/hospital/2005324011/home',
    'https://m.place.naver.com/hospital/2005324011',
    'https://map.kakao.com/link/search/clinic', 'https://www.google.com/maps/search/?query=clinic',
    'https://maps.google.com/', 'https://maps.app.goo.gl/example',
  ]) app.click(href);
  assert.equal(app.events().length, 7);
});

test('normal and keyboard link navigation are not blocked; right clicks are ignored', () => {
  const app = fixture();
  const mouse = app.click('tel:0269595982');
  const keyboard = app.click('https://pf.kakao.com/_nXGxaX/chat', { detail: 0 });
  app.click('tel:0269595982', { button: 2 });
  app.click('tel:0269595982', { defaultPrevented: true });
  assert.equal(mouse.defaultPrevented, false);
  assert.equal(keyboard.defaultPrevented, false);
  assert.equal(app.events().length, 2);
});

test('same-tab excluded navigation disables GA before navigation without blocking it', () => {
  const app = fixture();
  const event = app.click('/internal-traffic');
  assert.equal(app.window[`ga-disable-${measurementId}`], true);
  assert.equal(event.defaultPrevented, false);
  assert.equal(app.events().length, 0);
  const newTab = fixture();
  newTab.click('/internal-traffic', { target: '_blank' });
  assert.equal(newTab.window[`ga-disable-${measurementId}`], false);
});

test('cancelled excluded navigation restores collection on the current public page', () => {
  const app = fixture();
  const event = app.click('/admin/columns');
  event.preventDefault();
  app.flushMicrotasks();
  assert.equal(app.window.orbAnalytics.status().enabled, true);
});

test('history transitions guard excluded routes before downstream analytics observes them', () => {
  const app = fixture();
  const previous = app.window.history.pushState;
  const observations = [];
  // Simulate GA wrapping history after bootstrap. The load hook re-wraps it.
  app.window.history.pushState = function (...args) {
    observations.push(app.window[`ga-disable-${measurementId}`]);
    return previous.apply(this, args);
  };
  app.scripts[0].load();
  app.window.history.pushState({}, '', '/admin/columns');
  assert.equal(observations[0], true);
  assert.equal(app.window.orbAnalytics.status().enabled, false);
  app.window.history.replaceState({}, '', '/column');
  assert.equal(app.window.orbAnalytics.status().enabled, true);
  assert.equal(app.calls().filter(([command]) => command === 'config').length, 1);
  assert.equal(app.events().filter(([, name]) => name === 'page_view').length, 0);
});

test('a later GA history wrapper observes excluded and eligible routes in the right state', () => {
  const app = fixture();
  app.scripts[0].load();
  const guardedHistory = app.window.history.pushState;
  const automaticViews = [];
  // Enhanced measurement observes the URL change after delegating to history.
  // This remains guarded even when that wrapper is installed after tag.onload.
  app.window.history.pushState = function (...args) {
    const result = guardedHistory.apply(this, args);
    if (!app.window[`ga-disable-${measurementId}`]) {
      automaticViews.push(app.window.location.pathname);
    }
    return result;
  };
  app.window.history.pushState({}, '', '/internal-traffic');
  app.window.history.pushState({}, '', '/column');
  app.window.history.pushState({}, '', '/admin/columns');
  app.window.history.pushState({}, '', '/first-visit');
  assert.deepEqual(automaticViews, ['/column', '/first-visit']);
  assert.equal(app.calls().filter(([command]) => command === 'config').length, 1);
  assert.equal(app.events().length, 0);
});

test('first eligible route after an excluded page configures GA only once', () => {
  const app = fixture({ url: 'https://orbclinic.pages.dev/admin/columns' });
  assert.equal(app.calls().length, 0);
  app.window.history.replaceState({}, '', '/column');
  assert.equal(app.scripts.length, 1);
  assert.equal(app.calls().filter(([command]) => command === 'config').length, 1);
  app.window.history.pushState({}, '', '/first-visit');
  app.click('https://m.booking.naver.com/booking/16/bizes/1731406');
  assert.equal(app.scripts.length, 1);
  assert.equal(app.calls().filter(([command]) => command === 'config').length, 1);
  assert.equal(app.events()[0][1], 'booking_click');
  assert.equal(app.events().filter(([, name]) => name === 'page_view').length, 0);
});

test('back/forward, restored pages, and another-tab opt-out re-evaluate eligibility', () => {
  const app = fixture();
  app.setLocation('/design-system');
  app.dispatch('window', 'popstate');
  assert.equal(app.window[`ga-disable-${measurementId}`], true);
  app.setLocation('/first-visit');
  app.dispatch('window', 'pageshow');
  assert.equal(app.window[`ga-disable-${measurementId}`], false);
  app.storage.set(internalKey, '1');
  app.dispatch('window', 'storage', { key: internalKey });
  assert.equal(app.window[`ga-disable-${measurementId}`], true);
  app.click('https://pf.kakao.com/_nXGxaX/chat');
  assert.equal(app.events().length, 0);
});
