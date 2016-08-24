
var express = require('express');
var app = express();

const crypto = require('crypto');
const randumpath = crypto.randomBytes(30);

console.log(
  `Enter: http://localhost:3000/${randumpath.toString('hex')}`
);


var recursive = require('recursive-readdir');
recursive('./', function (err, files) {
  // Files is an array of filename
  console.log(files);
});

app.get('/' + randumpath.toString('hex'), function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
