const http = require('http');
const fs = require('fs');

//url module at the top
const { URL } = require('url');
const path = require('path');

const PORT = 8080;
const LOG_FILE = path.join(__dirname, 'log.txt');

function logRequest(req) {
  const line = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile(LOG_FILE, line, (err) => {
    if (err) console.error('Log write error:', err);
  });
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('500 — Server error');
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}

http.createServer((req, res) => {
  logRequest(req);

  //parses the incoming request URL
  const parsed = new URL(req.url, 'http://' + req.headers.host);
  
  //checks URL path for 'documentation'
  const isDocs = parsed.pathname.toLowerCase().includes('documentation');

  //chooses which html to send
  const file = isDocs ? 'documentation.html' : 'index.html';
  const filePath = path.join(__dirname, file);

  //reads and sends the file
  serveFile(res, filePath);
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
