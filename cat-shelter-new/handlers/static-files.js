const fs = require('fs/promises');

function getContentType(url) {
  if (url.endsWith('css')) {
    return 'text/css';
  } else if (url.endsWith('html')) {
    return 'text/html';
  } else if (url.endsWith('png') || url.endsWith('ico')) {
    return 'image/png';
  } else if (url.endsWith('js') || url.endsWith('json')) {
    return 'application/json';
  }
};


module.exports = (req, res) => {
  const pathname = req.url;
  if (pathname.startsWith('/content') && req.method === 'GET') {

    fs.readFile(`./${pathname}`, 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead('404', { 'Content-Type': 'text/plain' });
        res.end('Page not found');
        return;
      }
      return data;
    }).then((data) => {
      res.writeHead('200', {
        'Content-Type': getContentType(pathname),
      });
      res.write(data);
      res.end();
    });

  } else {
    return true;
  }
}