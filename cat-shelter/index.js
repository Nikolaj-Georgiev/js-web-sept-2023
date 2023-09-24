const http = require('http');
const fs = require('fs/promises');

const PORT = 5555;


const server = http.createServer(async (req, res) => {
  const { url } = req;

  if (url === '/') {
    const imageUrlPattern = /{{imageUrl}}/g;
    const namePattern = /{{name}}/g;
    const breedPattern = /{{breed}}/g;
    const descriptionPattern = /{{description}}/g;

    const catTemplate = await fs.readFile('./views/home/catTemplate.html', 'utf-8');
    const homeHtml = await fs.readFile('./views/home/index.html', 'utf-8');

    await fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
      if (err) console.log(err);

      return data;
    })
      .then((data) => {
        const catts = JSON.parse(data);
        const catHtml = catts.map((cat) =>
          catTemplate
            .replace(imageUrlPattern, cat.imageUrl)
            .replace(namePattern, cat.name)
            .replace(breedPattern, cat.breed)
            .replace(descriptionPattern, cat.description)
        )
          .join('');
        return catHtml;
      })
      .then((catHtml) => {
        const homeHtmlTemplate = homeHtml.replace('{{cats}}', catHtml);
        res.writeHead(200, {
          'Content-type': 'text/html',
        });
        res.write(homeHtmlTemplate);
      });
  } else if (url === '/content/styles/site.css') {
    const siteCss = await fs.readFile('./content/styles/site.css', 'utf-8');
    res.writeHead(200, {
      'Content-type': 'text/css',
    });
    res.write(siteCss);
  } else if (url === '/cats/add-breed') {
    const addBreedHtml = await fs.readFile('./views/addBreed.html', 'utf-8');
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.write(addBreedHtml);
  } else if (url === '/cats/add-cat') {
    const addCatHtml = await fs.readFile('./views/addCat.html', 'utf-8');
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.write(addCatHtml);
  }
  res.end();
});

server.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));