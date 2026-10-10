(() => {
  'use strict';
  const config = window.OMOKI_SHARE_CONFIG || {};
  const key = String(config.kakaoJavaScriptKey || '').trim();
  const sdkUrl = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js';
  const sdkIntegrity = 'sha384-oroumrnFVE0xtgqyDZJARgERibXg2C28380uaUZz2kHDS5CR7tu20eGiOU6GkTpy';
  let sdkPromise;

  function pageUrl() {
    try {
      const url = new URL(config.publicPageUrl);
      const host = url.hostname;
      if (url.protocol !== 'https:' || url.username || url.password || !host.includes('.') ||
          /(^|\.)(localhost|local|test|invalid)$/.test(host) || /^[\d.]+$/.test(host)) return null;
      url.search = '';
      url.hash = '';
      return url;
    } catch { return null; }
  }

  function problem() {
    if (!/^https?:$/.test(location.protocol)) return 'local-preview';
    if (!/^[a-f0-9]{32}$/i.test(key) || !pageUrl()) return 'not-configured';
    return null;
  }

  function typeFor(id) {
    const type = window.OMOKI_DATA.types.find(type => type.id === id);
    if (!type) throw new Error('Unknown character');
    return type;
  }

  function resultUrl(id) {
    typeFor(id);
    const url = pageUrl();
    if (!url) return null;
    // No responses or identifiers are placed in the shared URL.
    url.hash = 'result/' + id;
    return url.href;
  }

  function resultText(id) {
    const type = typeFor(id);
    const story = window.OMOKI_STORIES[id];
    return `직장인 오목이 | ${type.plant}형, ${type.title}\n${story.quote}\n\n오늘 써먹을 한마디: ${story.say}\n\n재미로 보는 창작 캐릭터 이야기. 심리검사·의학적 진단이 아닙니다.`;
  }

  function copyText(id) {
    const url = resultUrl(id);
    return resultText(id) + (url ? '\n\n' + url : '');
  }

  function payload(id) {
    const url = resultUrl(id);
    if (!url) throw new Error('A public quiz URL is required');
    return {
      objectType: 'text',
      text: resultText(id),
      link: { mobileWebUrl: url, webUrl: url },
      buttonTitle: '오목이 이야기 보기'
    };
  }

  function initialize() {
    const sdk = window.Kakao;
    if (!sdk?.Share?.sendDefault) throw new Error('Kakao SDK unavailable');
    if (!sdk.isInitialized()) sdk.init(key);
    if (!sdk.isInitialized()) throw new Error('Kakao SDK initialization failed');
    return sdk;
  }

  function prepare() {
    if (problem()) return Promise.reject(new Error('Kakao sharing is not configured'));
    if (window.Kakao) return Promise.resolve().then(initialize);
    if (!sdkPromise) {
      sdkPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const finish = error => {
          clearTimeout(timer);
          script.onload = script.onerror = null;
          if (error) { script.remove(); reject(error); return; }
          try { resolve(initialize()); } catch (failure) { script.remove(); reject(failure); }
        };
        const timer = setTimeout(() => finish(new Error('Kakao SDK load timed out')), 10000);
        script.src = sdkUrl;
        script.integrity = sdkIntegrity;
        script.crossOrigin = 'anonymous';
        script.referrerPolicy = 'origin';
        script.async = true;
        script.onload = () => finish();
        script.onerror = () => finish(new Error('Kakao SDK could not load'));
        document.head.append(script);
      }).catch(error => { sdkPromise = null; throw error; });
    }
    return sdkPromise;
  }

  function send(id) {
    if (problem() || !window.Kakao?.isInitialized()) throw new Error('Kakao sharing is not ready');
    return window.Kakao.Share.sendDefault(payload(id));
  }

  window.OMOKI_SHARING = { problem, prepare, send, copyText, payload };
})();
