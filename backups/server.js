const http = require('http');
const fs = require('fs');
const { URL } = require('url');
const path = require('path');

const PORT = 8080;
const LOG_FILE = path.join(__dirname, 'log.txt');
const PUBLIC_DIR = path.join(__dirname, 'public');

function logRequest(req) {
  const line = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile(LOG_FILE, line, (err) => {
    if (err) console.error('Log write error:', err);
  });
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 — Not found');
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}

http.createServer((req, res) => {
  logRequest(req);

  const parsed = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsed.pathname.toLowerCase();

  // ignore favicon noise
  if (pathname === '/favicon.ico') {
    res.writeHead(204);
    return res.end();
  }

  // route matching
  if (pathname === '/' || pathname === '/index.html') {
    return serveFile(res, path.join(PUBLIC_DIR, 'index.html'));
  }

  if (pathname === '/documentation' || pathname === '/documentation.html') {
    return serveFile(res, path.join(PUBLIC_DIR, 'documentation.html'));
  }

  // anything else
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 — Not found');
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
