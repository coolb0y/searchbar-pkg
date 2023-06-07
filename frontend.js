const express = require('express');
const path = require('path');
const app = express();


path.join(__dirname, 'build/index.html');
path.join(__dirname, 'build/asset-manifest.json');
path.join(__dirname, 'build/static/js/main.4360c1a2.js');
path.join(__dirname, 'build/static/js/main.4360c1a2.js.map');
path.join(__dirname, 'build/static/js/main.4360c1a2.js.LICENSE.txt');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
