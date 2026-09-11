// Drive the running dev server over the Chrome DevTools Protocol to test
// behaviour a screenshot cannot show: overflow, menus, form validation.
//
//   1. "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
//        --headless --disable-gpu --remote-debugging-port=9333 \
//        --user-data-dir=/tmp/cdp-profile about:blank &
//   2. node --experimental-websocket .claude/skills/visual-qa/scripts/drive.mjs \
//        [base-url] [out-dir] [port]
//
// Node 20 needs --experimental-websocket for the global WebSocket.
import fs from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT = process.argv[3] || '.';
const PORT = process.argv[4] || '9333';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const page = targets.find((t) => t.type === 'page');
if (!page) throw new Error('no page target — is Chrome running with --remote-debugging-port?');

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const problems = [];
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type))
    problems.push(`console.${m.params.type}: ${m.params.args.map((a) => a.value ?? a.description ?? '').join(' ')}`);
  if (m.method === 'Runtime.exceptionThrown')
    problems.push(`exception: ${m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text}`);
  if (m.method === 'Network.loadingFailed')
    problems.push(`request failed: ${m.params.errorText} (${m.params.type})`);
});
await new Promise((r) => ws.addEventListener('open', r));
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;
const shot = async (name) => {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(r.result.data, 'base64'));
};

for (const domain of ['Runtime', 'Log', 'Page', 'Network']) await send(`${domain}.enable`);

const results = [];
const check = (label, value) => { results.push(`${label}: ${value}`); return value; };

// 1. every route renders without console errors or failed requests
for (const route of ['/', '/projects', '/skills', '/experience', '/contact']) {
  await send('Page.navigate', { url: BASE + route });
  await wait(3000);
  check(`route ${route}`, await evaluate('document.querySelectorAll("main *").length > 20 ? "rendered" : "EMPTY"'));
}

// 2. phone width: no horizontal overflow, mobile menu opens and closes
await send('Emulation.setDeviceMetricsOverride', { width: 414, height: 820, deviceScaleFactor: 1, mobile: true });
await send('Page.navigate', { url: BASE + '/' });
await wait(3000);
check('414px overflow', await evaluate(
  'document.documentElement.scrollWidth <= document.documentElement.clientWidth ? "none" : "OVERFLOW " + document.documentElement.scrollWidth'));
await evaluate('document.querySelector("header button[aria-controls=mobile-nav]")?.click()');
await wait(600);
check('mobile menu links', await evaluate(
  'Array.from(document.querySelectorAll("#mobile-nav a")).map(a => a.textContent.trim()).join(",") || "MENU DID NOT OPEN"'));
await shot('mobile-menu-open');
await evaluate('document.querySelector("header button[aria-controls=mobile-nav]")?.click()');
await wait(400);
check('mobile menu closes', await evaluate('document.getElementById("mobile-nav") ? "STILL OPEN" : "closed"'));

// 3. contact form validation (never submits — that would open a mail client)
await send('Emulation.clearDeviceMetricsOverride');
await send('Page.navigate', { url: BASE + '/contact' });
await wait(3000);
await evaluate('document.querySelector("form button[type=submit]").click()');
await wait(500);
check('empty submit', await evaluate(
  'Array.from(document.querySelectorAll("form p")).map(p => p.textContent).join(" | ") || "NO VALIDATION"'));
check('invalid email', await evaluate(`(() => {
  const set = (sel, val) => {
    const el = document.querySelector(sel);
    Object.getOwnPropertyDescriptor(el.constructor.prototype, 'value').set.call(el, val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };
  set('#name', 'QA Bot'); set('#message', 'hello'); set('#email', 'not-an-email');
  document.querySelector('form button[type=submit]').click();
  return new Promise((r) => setTimeout(() => r(
    Array.from(document.querySelectorAll('form p')).map((p) => p.textContent).join(' | ') || 'NOT FLAGGED'), 400));
})()`));

console.log(results.join('\n'));
console.log(problems.length ? `\nbrowser problems:\n${problems.join('\n')}` : '\nbrowser problems: none');
ws.close();
