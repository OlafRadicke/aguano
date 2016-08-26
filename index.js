
var express = require('express');
var app = express();

const crypto = require('crypto');
const randumpath = crypto.randomBytes(30);
var recursive = require('recursive-readdir');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

var trim = require("trim")

console.log(`Enter: http://localhost:3000/${randumpath.toString('hex')}`);
console.log("AGUANO_CONTENT: " + process.env.AGUANO_CONTENT);

recursive(process.env.AGUANO_CONTENT, function (err, files) {
	// Files is an array of filename
	console.log(files);
	if (err)
  		throw ("Reading directory is faild with:" + err);

	db.serialize(function() {
		db.run("CREATE TABLE keyword (path TEXT, key TEXT)");
		var stmt = db.prepare("INSERT INTO keyword VALUES (?,?)");
		files.forEach(function(path) {
			trim(path).split("/").forEach(function(part){
				part.split(/-| |_|\.|,|\[|\]|\(|\)/).forEach(function(key){
					if (key.length > 2) {
						stmt.run(path, key.toLowerCase() );
					};
				})
			})
		})
		stmt.finalize();

		// db.each("SELECT path, key FROM keyword", function(err, row) {
		//  	console.log(row.path + ": " + row.key);
		// });
		db.each("SELECT DISTINCT  key FROM keyword ORDER BY key ASC", function(err, row) {
			console.log("key: " + row.key);
		});
	});

	app.get('/' + randumpath.toString('hex'), function (req, res) {
		res.send('Hello World!');
	});

	app.listen(3000, function () {
		console.log('App is runing!');
	});
});
