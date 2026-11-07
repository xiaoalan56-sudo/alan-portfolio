import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain' };
const port = process.env.PORT || 4173;
createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(req.url.split('?')[0])); if (p.endsWith('/')) p += 'index.html';
  try { const f = await readFile(join(root, p)); res.writeHead(200, { 'Content-Type': types[extname(p)] || 'application/octet-stream' }); res.end(f); }
  catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, () => console.log(`http://localhost:${port}`));
