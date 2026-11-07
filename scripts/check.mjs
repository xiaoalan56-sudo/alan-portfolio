import { readFile, access } from 'node:fs/promises';
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const refs = [...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)].map(m => m[1]);
let bad = 0;
for (const r of new Set(refs)) { try { await access(new URL('../dist' + r, import.meta.url)); } catch { console.error('Missing', r); bad++; } }
for (const gone of ['Pathwise', 'Alan OS']) if (html.includes(gone)) { console.error('Removed project still present:', gone); bad++; }
console.log(bad ? `${bad} problem(s)` : `OK — ${new Set(refs).size} local references resolved`);
process.exit(bad ? 1 : 0);
