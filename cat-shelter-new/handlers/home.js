// const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');



module.exports = (req, res) => {
  const pathname = req.url;

  if (pathname === '/' && req.method === 'GET') {
    const filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error!');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });

      res.write(data);
      res.end();
    });

  } else {
    return true;
  }
}