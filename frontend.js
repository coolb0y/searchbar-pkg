const express = require('express');
const path = require('path');
const app = express();

path.join(__dirname, 'build/images/SearchPageLogo.png');
path.join(__dirname, 'build/index.html');
path.join(__dirname, 'build/asset-manifest.json');
path.join(__dirname, 'build/static/js/main.a2cd0160.js');
path.join(__dirname, 'build/static/js/main.a2cd0160.js.map');
path.join(__dirname, 'build/static/js/main.a2cd0160.js.LICENSE.txt');
path.join(__dirname, 'build/static/css/main.f3d684b1.css');
path.join(__dirname, 'build/static/css/main.f3d684b1.css.map');
path.join(__dirname, 'build/favicon.png');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
