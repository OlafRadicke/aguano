
var express = require('express');
var app = express();

const crypto = require('crypto');
const randumpath = crypto.randomBytes(30);
var recursive = require('recursive-readdir');

console.log(`Enter: http://localhost:3000/${randumpath.toString('hex')}`);
console.log("AGUANO_CONTENT: " + process.env.AGUANO_CONTENT);

recursive(process.env.AGUANO_CONTENT, function (err, files) {
	// Files is an array of filename
	console.log(files);
	if (err)
  		throw ("Reading directory is faild with:" + err);


	app.get('/' + randumpath.toString('hex'), function (req, res) {
		res.send('Hello World!');
	});

	app.listen(3000, function () {
		console.log('App is runing!');
	});
});
