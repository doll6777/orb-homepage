import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const output = new URL('../dist/client/', import.meta.url);
const pages = ['/', '/about', '/first-visit', '/column', '/column/wet-qeeg-guide',
  '/column/qeeg-process', '/column/autonomic-top-down-bottom-up',
  '/treatments/pain-chuna', '/treatments/autonomic-qeeg',
  '/treatments/stress-neurosis', '/treatments/weight-metabolism', '/en', '/en/first-visit'];
const file = route => new URL(route === '/' ? 'index.html' : `${route.slice(1)}.html`, output);
const htmlFor = route => readFile(file(route), 'utf8');
const tags = (html, tag) => html.match(new RegExp(`<${tag}\\b[^>]*>`, 'g')) ?? [];
const attr = (tag, key) => tag.match(new RegExp(`(?:\\s|^)${key}="([^"]*)"`))?.[1];

for (const route of pages) {
  test(`${route}: one contact bar with the correct language-specific destinations`, async () => {
    const html = await htmlFor(route);
    const bars = html.match(/<nav class="mobile-cta"[^>]*>[\s\S]*?<\/nav>/g) ?? [];
    assert.equal(bars.length, 1);
    const anchors = tags(bars[0], 'a');
    const links = anchors.map(tag => attr(tag, 'href'));
    assert.equal(links.length, 3);
    const english = route === '/en' || route.startsWith('/en/');
    if (english) {
      assert.equal(links[0], '/en/first-visit#booking');
      assert.ok(!attr(anchors[0], 'target') || attr(anchors[0], 'target') === '_self');
      assert.match(bars[0], />How to book<\/a>/);
    } else {
      assert.ok(links[0].startsWith('https://m.booking.naver.com/booking/16/bizes/1731406?'));
    }
    assert.equal(links[1], 'https://pf.kakao.com/_nXGxaX/chat');
    assert.equal(links[2], english ? 'tel:+82269595982' : 'tel:0269595982');
    assert.ok(html.includes('src="/orb-analytics.js"'));
  });

  test(`${route}: internal links and fragments exist in the static export`, async () => {
    const html = await htmlFor(route);
    for (const tag of tags(html, 'a')) {
      const href = attr(tag, 'href');
      if (!href || (!href.startsWith('/') && !href.startsWith('#')) || href.startsWith('//')) continue;
      const url = new URL(href, `https://orbclinic.pages.dev${route}`);
      const target = await htmlFor(url.pathname);
      if (url.hash) assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `${route} → ${href}`);
    }
  });

  test(`${route}: photos use real responsive files and explicit loading/dimensions`, async () => {
    for (const image of tags(await htmlFor(route), 'img')) {
      const src = attr(image, 'src');
      if (src?.includes('logo')) continue;
      assert.ok(src?.startsWith('/images/'), `${route}: ${src}`);
      assert.ok(Number(attr(image, 'width')) > 0);
      assert.ok(Number(attr(image, 'height')) > 0);
      assert.ok(attr(image, 'sizes'));
      assert.match(attr(image, 'loading'), /^(lazy|eager)$/);
      if (attr(image, 'loading') === 'eager') assert.equal(attr(image, 'fetchPriority') ?? attr(image, 'fetchpriority'), 'high');
      const srcSet = attr(image, 'srcSet') ?? attr(image, 'srcset');
      assert.ok(srcSet, `${route}: missing srcset`);
      for (const item of srcSet.split(', ')) {
        const [variant, width] = item.split(' ');
        assert.match(width, /^\d+w$/);
        assert.ok((await stat(new URL(variant.slice(1), output))).size > 0);
      }
    }
  });
}

for (const [route, title] of [
  ['/en', 'Korean Medicine Clinic in Magok, Seoul | ORB'],
  ['/en/first-visit', 'Your First Visit in Magok, Seoul | ORB Clinic'],
]) {
  test(`${route}: English title, language, canonical and international phone links are exported`, async () => {
    const html = await htmlFor(route);
    assert.equal(html.match(/<title>([^<]*)<\/title>/)?.[1], title);
    assert.ok(tags(html, 'main').some(tag => attr(tag, 'lang') === 'en'));
    const canonicals = tags(html, 'link').filter(tag => attr(tag, 'rel') === 'canonical');
    assert.equal(canonicals.length, 1);
    assert.equal(attr(canonicals[0], 'href'), `https://orbclinic.pages.dev${route}`);
    const phoneLinks = tags(html, 'a').map(tag => attr(tag, 'href')).filter(href => href?.startsWith('tel:'));
    assert.ok(phoneLinks.length > 0);
    assert.ok(phoneLinks.every(href => href === 'tel:+82269595982'));
  });
}

for (const route of ['/first-visit', '/en/first-visit']) {
  test(`${route}: first-visit translations declare reciprocal language alternatives`, async () => {
    const html = await htmlFor(route);
    const links = tags(html, 'link');
    const canonical = links.find(tag => attr(tag, 'rel') === 'canonical');
    assert.equal(attr(canonical ?? '', 'href'), `https://orbclinic.pages.dev${route}`);
    for (const [language, target] of [['ko', '/first-visit'], ['en', '/en/first-visit']]) {
      const alternatives = links.filter(tag => attr(tag, 'rel') === 'alternate' &&
        (attr(tag, 'hrefLang') ?? attr(tag, 'hreflang')) === language);
      assert.equal(alternatives.length, 1);
      assert.equal(attr(alternatives[0], 'href'), `https://orbclinic.pages.dev${target}`);
    }
  });
}

test('the exported sitemap includes both first-visit translations and reciprocal alternatives', async () => {
  const sitemap = await readFile(new URL('sitemap.xml', output), 'utf8');
  const entries = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  for (const route of ['/first-visit', '/en/first-visit']) {
    const matching = entries.filter(entry => entry.includes(`<loc>https://orbclinic.pages.dev${route}</loc>`));
    assert.equal(matching.length, 1, route);
    for (const [language, target] of [['ko', '/first-visit'], ['en', '/en/first-visit']]) {
      const alternatives = tags(matching[0], 'xhtml:link').filter(tag => attr(tag, 'rel') === 'alternate' &&
        attr(tag, 'hreflang') === language);
      assert.equal(alternatives.length, 1, `${route}: ${language}`);
      assert.equal(attr(alternatives[0], 'href'), `https://orbclinic.pages.dev${target}`);
    }
  }
});

test('structured data does not promise unconfirmed English-language assistance', async () => {
  function languageDeclarations(value) {
    if (!value || typeof value !== 'object') return [];
    return Object.entries(value).flatMap(([key, child]) => key === 'availableLanguage'
      ? [child]
      : languageDeclarations(child));
  }
  for (const route of pages) {
    const html = await htmlFor(route);
    const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    for (const [, json] of schemas) {
      for (const declaration of languageDeclarations(JSON.parse(json))) {
        assert.doesNotMatch(JSON.stringify(declaration), /English|"en(?:-[^"]+)?"/i, route);
      }
    }
  }
});

test('settings/privacy do not contain a fixed booking bar', async () => {
  for (const route of ['/internal-traffic', '/privacy']) {
    assert.ok(!(await htmlFor(route)).includes('class="mobile-cta"'));
  }
});

test('FAQ and QEEG preparation are connected in both directions', async () => {
  const first = await htmlFor('/first-visit');
  assert.ok(first.includes('첫 진료는 얼마나 걸리나요?'));
  assert.ok(first.includes('비용과 보험 적용은 어떻게 확인하나요?'));
  assert.ok(first.includes('href="/column/qeeg-process"'));
  assert.ok((await htmlFor('/column/qeeg-process')).includes('href="/first-visit"'));
  assert.ok((await htmlFor('/treatments/autonomic-qeeg')).includes('href="/column/qeeg-process"'));
});

test('optimized image sizes preserve proportions without upscaling', async () => {
  const manifest = JSON.parse(await readFile(new URL('../app/components/image-manifest.json', import.meta.url), 'utf8'));
  for (const [original, image] of Object.entries(manifest)) {
    const originalBytes = (await stat(new URL(`../public${original}`, import.meta.url))).size;
    let previousWidth = 0;
    for (const variant of image.variants) {
      assert.ok(variant.width > previousWidth && variant.width <= image.width);
      assert.ok(Math.abs(variant.height - variant.width * image.height / image.width) <= 1);
      assert.ok(variant.bytes < originalBytes);
      previousWidth = variant.width;
    }
  }
});
