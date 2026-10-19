import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync,statSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {guides} from '../src/guides.mjs';
test('built routes, links, metadata and delivery budget',()=>{
  execFileSync(process.execPath,['scripts/build.mjs'],{cwd:resolve('.'),env:{...process.env,SITE_URL:'https://example.com'}});
  const routes=['/','/raid-capacity/','/transfer-time/','/energy-cost/','/privacy/','/about/','/disclosure/',...Object.keys(guides)];
  for(const route of routes){const html=readFileSync(`dist${route}index.html`,'utf8');assert.equal((html.match(/<h1>/g)||[]).length,1);assert.ok(html.includes('<meta name="description"'));assert.ok(html.includes(`href="https://example.com${route}"`));assert.ok(html.includes('id="main"'));assert.ok(statSync(`dist${route}index.html`).size<20000);for(const [,href] of html.matchAll(/href="(\/[^"#?]*)/g)){const file=`dist${href}${href.endsWith('/')?'index.html':''}`;assert.ok(existsSync(file),`Missing internal target ${file}`);}}
  assert.ok(readFileSync('dist/sitemap.xml','utf8').includes('https://example.com/energy-cost/'));
  for(const path of Object.keys(guides))assert.ok(readFileSync('dist/sitemap.xml','utf8').includes(`https://example.com${path}`));
  assert.ok(readFileSync('dist/index.html','utf8').includes('<meta name="google-site-verification" content="XYlMZkLfrpOnHaYwsaFtTP75JS-V0RpJEv2YgRgDmqg">'));
  const headers=readFileSync('dist/_headers','utf8');assert.ok(headers.includes("script-src 'self'"));assert.ok(headers.includes('frame-ancestors'));
  let assets=0;for(const f of ['app.mjs','calculations.mjs','style.css'])assets+=statSync(`dist/${f}`).size;assert.ok(assets<30000,`Shared assets exceed 30 KB: ${assets}`);
});
