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
const blocks = (html, tag) => html.match(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'g')) ?? [];
const hasClass = (tag, name) => (attr(tag, 'class') ?? '').split(/\s+/).includes(name);
const textOf = html => html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const bookingHref = 'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';
const kakaoHref = 'https://pf.kakao.com/_nXGxaX/chat';

function blockWith(html, tag, predicate) {
  const matching = [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'g'))]
    .filter(match => predicate(match[0]));
  assert.equal(matching.length, 1, `Expected one matching ${tag}`);
  const remainder = html.slice(matching[0].index);
  let depth = 0;
  for (const match of remainder.matchAll(new RegExp(`<\\/?${tag}\\b[^>]*>`, 'g'))) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return remainder.slice(0, match.index + match[0].length);
  }
  assert.fail(`Missing closing ${tag}`);
}

function assertExternalDestinations(fragment, expected) {
  const anchors = tags(fragment, 'a');
  assert.deepEqual(anchors.map(tag => attr(tag, 'href')?.replace(/&amp;/g, '&')), expected);
  for (const anchor of anchors) {
    assert.equal(attr(anchor, 'target'), '_blank');
    assert.ok((attr(anchor, 'rel') ?? '').split(/\s+/).includes('noreferrer'));
  }
}

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

test('Korean home connects four concern-led care cards to their treatment pages', async () => {
  const areas = blockWith(await htmlFor('/'), 'section', tag => attr(tag, 'id') === 'areas');
  const cards = blocks(areas, 'article').filter(block => hasClass(tags(block, 'article')[0], 'care-card'));
  const expected = [
    ['/treatments/pain-chuna', /목.*어깨.*허리/],
    ['/treatments/autonomic-qeeg', /자율신경.*뇌파검사.*궁금/],
    ['/treatments/stress-neurosis', /잠.*스트레스.*고민/],
    ['/treatments/weight-metabolism', /체중.*시작/],
  ];
  assert.equal(cards.length, expected.length);
  cards.forEach((card, index) => {
    const anchors = tags(card, 'a');
    assert.equal(anchors.length, 1);
    assert.equal(attr(anchors[0], 'href'), expected[index][0]);
    const headings = blocks(card, 'h3');
    assert.equal(headings.length, 1);
    assert.match(textOf(headings[0]), expected[index][1]);
  });
});

test('Korean home explains the visit process and FAQ before the space gallery', async () => {
  const [home, firstVisit] = await Promise.all([htmlFor('/'), htmlFor('/first-visit')]);
  const sections = tags(home, 'section');
  const processIndex = sections.findIndex(tag => hasClass(tag, 'home-care-process'));
  const faqIndex = sections.findIndex(tag => attr(tag, 'id') === 'first-visit');
  const galleryIndex = sections.findIndex(tag => attr(tag, 'id') === 'space-gallery');
  assert.ok(processIndex >= 0 && processIndex < faqIndex && faqIndex < galleryIndex);

  const process = blockWith(home, 'section', tag => hasClass(tag, 'home-care-process'));
  const homeSteps = blocks(blockWith(process, 'ol', tag => hasClass(tag, 'home-care-steps')), 'li');
  const visitSteps = blocks(blockWith(firstVisit, 'section', tag => hasClass(tag, 'visit-steps')), 'li').slice(1);
  assert.equal(homeSteps.length, 3);
  assert.equal(visitSteps.length, 3);
  homeSteps.forEach((step, index) => {
    for (const tag of ['h3', 'p']) {
      assert.deepEqual(blocks(step, tag).map(textOf), blocks(visitSteps[index], tag).map(textOf));
    }
  });
});

test('Korean home offers four native FAQs with shared answers and only the exams question open', async () => {
  const [home, firstVisit] = await Promise.all([htmlFor('/'), htmlFor('/first-visit')]);
  const faq = blockWith(home, 'section', tag => attr(tag, 'id') === 'first-visit');
  const details = blocks(faq, 'details');
  assert.equal(details.length, 4);
  const visitAnswers = new Map([...firstVisit.matchAll(/<dt\b[^>]*>([\s\S]*?)<\/dt>\s*<dd\b[^>]*>([\s\S]*?)<\/dd>/g)]
    .map(([, question, answer]) => [textOf(question), textOf(answer)]));
  const expectedTopics = [/검사.*모두/, /얼마나/, /비용.*보험/, /주차/];
  details.forEach((detail, index) => {
    assert.equal(/\sopen(?:\s|=|>)/.test(tags(detail, 'details')[0]), index === 0);
    const summaries = blocks(detail, 'summary');
    assert.equal(summaries.length, 1);
    const question = textOf(summaries[0]);
    assert.match(question, expectedTopics[index]);
    const answers = blocks(detail, 'p');
    assert.equal(answers.length, 1);
    assert.ok(visitAnswers.has(question), `Missing first-visit answer: ${question}`);
    assert.equal(textOf(answers[0]), visitAnswers.get(question), question);
  });
});

test('Korean home booking actions preserve the booking destinations without collecting health input', async () => {
  const home = await htmlFor('/');
  const heroActions = blockWith(home, 'div', tag => hasClass(tag, 'home-hero-actions'));
  const heroAnchors = tags(heroActions, 'a');
  assert.equal(heroAnchors.length, 2);
  assertExternalDestinations(heroAnchors[0], [bookingHref]);
  assert.equal(attr(heroAnchors[1], 'href'), '#first-visit');
  assert.ok(!attr(heroAnchors[1], 'target') || attr(heroAnchors[1], 'target') === '_self');

  const faq = blockWith(home, 'section', tag => attr(tag, 'id') === 'first-visit');
  const bookingActions = blockWith(faq, 'div', tag => hasClass(tag, 'home-booking-actions'));
  assertExternalDestinations(bookingActions, [bookingHref, kakaoHref]);
  assert.doesNotMatch(home, /<(?:form|input|textarea|select)\b/i);
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
