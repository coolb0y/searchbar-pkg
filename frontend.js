const express = require('express');
const path = require('path');
const app = express();

path.join(__dirname, 'build/images/SearchPageLogo.png');
path.join(__dirname, 'build/index.html');
path.join(__dirname, 'build/asset-manifest.json');
path.join(__dirname, 'build/static/js/main.65be46fa.js');
path.join(__dirname, 'build/static/js/main.65be46fa.js.map');
path.join(__dirname, 'build/static/js/main.65be46fa.js.LICENSE.txt');
path.join(__dirname, 'build/static/css/main.a8a7f765.css');
path.join(__dirname, 'build/static/css/main.a8a7f765.css.map');
path.join(__dirname, 'build/favicon.png');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
