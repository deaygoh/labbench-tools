import assert from 'node:assert/strict';
const origin=process.argv[2];
assert.ok(/^https:\/\/[a-z0-9.-]+$/i.test(origin||''),'Pass the actual production HTTPS origin.');
const results=[];
for(const path of ['/','/raid-capacity/','/transfer-time/','/energy-cost/','/privacy/','/about/','/disclosure/','/guides/','/guides/raid-capacity-tb-vs-tib/','/guides/backup-window-planning/','/app.mjs','/calculations.mjs','/style.css','/favicon.svg','/robots.txt','/sitemap.xml','/missing-release-check']){
  const response=await fetch(origin+path,{signal:AbortSignal.timeout(20000)});
  const body=await response.text();const expected=path==='/missing-release-check'?404:200;
  assert.equal(response.status,expected,`${path} HTTP status`);
  assert.equal(response.headers.get('x-content-type-options'),'nosniff',`${path} MIME protection`);
  assert.ok(response.headers.get('content-security-policy')?.includes("object-src 'none'"),`${path} CSP`);
  if(path.endsWith('/')){assert.ok(body.includes(`href="${origin}${path}"`),`${path} production canonical`);assert.ok(!body.includes('https://example.com'),`${path} no test origin`);}
  if(path==='/sitemap.xml'){assert.ok(body.includes(`${origin}/energy-cost/`));assert.ok(!body.includes('example.com'));}
  results.push({path,status:response.status,bytes:Buffer.byteLength(body),csp:true});
}
console.log(JSON.stringify({origin,verifiedAt:new Date().toISOString(),checks:results},null,2));
