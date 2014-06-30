var crud = (function(exports) {

	var mongo, // import mongo
		Server, // save a reference to the Server constructor
		Db, // save a reference to the DB constructor
		BSON, // save a reference to the BSON object (used to generate mongo IDs) 
		server, // this is our mongodb server
		db, // this is our mongodb Database
		init,
		findAll, 
		findById, 
		addAmbientData; 
		
	mongo = require('mongodb');
	Server = mongo.Server;
	Db = mongo.Db;
	BSON = mongo.BSONPure;
	server = new Server('localhost', 27017, {auto_reconnect : true});
	db = new Db('tesset-test', server);


	db.open(function(err, db) {
		if(!err) {
			console.log('connected to Tesset Test db');
			db.collection('ambient', {strict : true}, function(err, collection) {
				if(err) {
					console.log('the ambient collection does not exist yet. create it.');
				}
			});
		}
	});

	findAll = function(req, res) {
		db.collection('ambient', function(err, collection) {
			collection.find().toArray(function(err, items) {
				console.log('got them ambient data for ya: ', items);
				res.send(items);
			});
		});
	};

	findById = function(req, res) {
		var id = req.params.id;
		console.log('getting the ambient:' + id);
		db.collection('ambient', function(err, collection) {
			collection.findOne({'_id' : new BSON.ObjectID(id)}, function(err, item) {
				console.log('found you an ambient data record ', item);
			});
		});	
	};

	add = function(req, res) {
		var ambientData = req.body;
		console.log('adding this little guy: ', ambientData);
		db.collection('ambient', function(err, collection) {
			collection.insert(ambientData, {safe : true}, function(err, collection) {
				if(err) {
					console.log('an error has occured');
				} else {
					console.log('ambientData added what what', result[0]);
					res.send(result[0]);
				}
			});
		});
	};


	init = function() {
		exports.findAll = findAll;
		exports.findById = findById;
		exports.add = add;
	};

	return {
		init : init
	};

})(exports);

crud.init();