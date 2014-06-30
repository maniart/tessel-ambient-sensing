
var server = (function(exports) {
	// list all your local vars
	var express,
		app,
		http,
		notes,
		bodyParser,
		init;

	// instantiate all vars here.
	express = require('express');
	crud = require('./crud');
	http = require('http');
	bodyParser = require('body-parser');

	app = express();

	app.set('port', 9999);
	app.use(bodyParser());
	app.use(express.static(__dirname + '/public'));

	// set up the routes. match routes with functions.
	app.get('/api/get', crud.findAll);
	app.get('/api/:id', crud.findById);
	app.post('/api/post', crud.add);
	// this is the initiation function. call this and everything kicks off.
	init = function() {
		http.createServer(app).listen(app.get('port'), function() {
			console.log('Magic Happening on port: ', app.get('port'));
		});
	};

	return {
		init : init
	};

})(exports);

server.init();