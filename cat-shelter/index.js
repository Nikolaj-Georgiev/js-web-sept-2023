const http = require('http');
const { homeTemplate } = require('./views/home/index');
const { siteCss } = require('./content/styles/site');
const { addBreed } = require('./views/addBreed');
const addCat = require('./views/addCat');
const catTemplate = require('./views/home/catTemplate');
const PORT = 5555;

const cats = [
  {
    imageUrl: 'https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg',
    name: 'Tsunami',
    breed: 'ulichna1',
    description: 'Very cute cat1!'
  },
  {
    imageUrl: 'https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg',
    name: 'Pesho',
    breed: 'ulichna2',
    description: 'Very cute cat2!'
  },
  {
    imageUrl: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
    name: 'Dancho',
    breed: 'ulichna3',
    description: 'Very cute cat3!'
  },
  {
    imageUrl: 'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
    name: 'Mariika',
    breed: 'ulichna4',
    description: 'Very cute cat4!'
  },
];

const router = (url) => { };

const server = http.createServer((req, res) => {
  const { url } = req;
  // console.log(url);

  if (url === '/') {
    const imageUrlPattern = /{{imageUrl}}/g;
    const namePattern = /{{name}}/g;
    const breedPattern = /{{breed}}/g;
    const descriptionPattern = /{{description}}/g;

    const catHtml = cats.map(cat => catTemplate
      .replace(imageUrlPattern, cat.imageUrl)
      .replace(namePattern, cat.name)
      .replace(breedPattern, cat.breed)
      .replace(descriptionPattern, cat.description));
    const homeHtmlTemplate = homeTemplate.replace('{{cats}}', catHtml);
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.write(homeHtmlTemplate);
  } else if (url === '/content/styles/site.css') {
    res.writeHead(200, {
      'Content-type': 'text/css',
    });
    res.write(siteCss);
  } else if (url === '/cats/add-breed') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.write(addBreed);
  } else if (url === '/cats/add-cat') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.write(addCat);
  }


  res.end();

});

server.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));