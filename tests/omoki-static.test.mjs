import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../public/omoki/', import.meta.url));
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

test('Omoki is self-contained at its published URL', () => {
  const html = read('index.html');
  assert.match(html, /canonical" href="https:\/\/orbclinic.pages.dev\/omoki\/"/);
  assert.match(html, /name="robots" content="index, follow"/);
  assert.doesNotMatch(html, /DESIGN PREVIEW|chatgpt.site|file:\/\//);
  for (const match of html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)) {
    assert.ok(fs.statSync(path.join(root, match[1])).isFile(), match[1]);
  }
  for (const file of ['app.js', 'styles.css', 'data.js', 'stories.js', 'matching.js', 'sharing.js']) {
    assert.doesNotMatch(read(file), /\.\.\/\.\.\/(?:public|designs)/);
  }
  for (const name of ['01-cosmos.png', '02-sunflower.png', '03-cactus.png', '04-ivy.png', 'PretendardVariable.woff2', 'orb-logo-brown.png']) {
    assert.ok(fs.statSync(path.join(root, 'assets', name)).size > 0);
  }
  const atlas = fs.readFileSync(path.join(root, 'omoki-atlas-v1.png'));
  assert.equal(atlas.readUInt32BE(16), 1145);
  assert.equal(atlas.readUInt32BE(20), 1374);
});

test('All 30 character profiles are reachable with the 24-question contract', () => {
  const context = { window: {} };
  for (const file of ['data.js', 'stories.js', 'matching.js', 'share-config.js']) vm.runInNewContext(read(file), context);
  const { OMOKI_DATA: data, OMOKI_MATCHING: matching, OMOKI_STORIES: stories, OMOKI_SHARE_CONFIG: config } = context.window;
  assert.equal(data.questions.length, 24);
  assert.equal(data.types.length, 30);
  assert.equal(Object.keys(stories).length, 30);
  for (const profile of matching.profiles) {
    const answers = Object.fromEntries(data.questions.map(q => [q.id, profile.values[matching.axisIds.indexOf(q.dimension)]]));
    const result = matching.match(answers, data);
    assert.equal(result.status, 'matched');
    assert.equal(result.typeId, profile.id);
  }
  assert.equal(config.publicPageUrl, 'https://orbclinic.pages.dev/omoki/');
  assert.equal(config.kakaoJavaScriptKey, '');
});

test('Omoki retains clinic attribution without symptoms or booking invitations', () => {
  const html = read('index.html');
  const app = read('app.js');
  assert.match(html, /class="clinic-logo" href="https:\/\/orbclinic.pages.dev\/"/);
  assert.match(html, /오브한의원이 만든 직장생활 이야기/);
  assert.match(html, /심리검사·의학적 진단이 아닙니다/);
  assert.doesNotMatch(html + app, /clinic-invite|data-clinic-link|몸은 아직 야근|어떤 진료를 받을|톡톡으로 방문|네이버 예약|talk\.naver\.com|booking\.naver\.com|pcmap\.place\.naver\.com/);
});

test('Static export retains every quiz file unchanged', () => {
  const output = fileURLToPath(new URL('../dist/client/omoki/', import.meta.url));
  for (const file of fs.readdirSync(root, { recursive: true })) {
    if (!fs.statSync(path.join(root, file)).isFile()) continue;
    assert.deepEqual(fs.readFileSync(path.join(output, file)), fs.readFileSync(path.join(root, file)), file);
  }
});
