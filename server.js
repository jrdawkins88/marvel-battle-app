var express = require('express');
var stats = require('battlemanager/data/characters.json');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// creates a function that will serve (host) static files (assets) at a particular directory we indicate (middleware)
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/public'));

var db = {
	battles: []
};

app.use(bodyParser());
app.use(cors());

app.get('/stats', function (req, res) {  // req = request; res = response
	res.json(stats);
});

app.get('/stats/:id', function (req, res) {
	var id = parseInt(req.params.id);

	var stat = stats.find(function (obj) {
		return obj.id === id;  // meaning when this expression evaluates to true
	});

	if (!stat) {
		res.sendStatus(404);
		return;
	}

	res.json(stat);
});

// GET: /battles
// Respond with a list of battles.
app.get('/battles', function (req, res) {
	var battles = db.battles;
	var characterId = parseInt(req.query.characterId); // Would get the value of ?characterId=value
	
	if (characterId) {
		battles = battles.filter(function (battle) {
			return battle.left === characterId || battle.right === characterId;
		});
	}

	res.json(battles);
});

// POST: /battles
// Create a battle, add it to the data, respond with the battle.
app.post('/battles', function (req, res) {
	var newBattle = {};

	// use the req.body to add properties/values to the newBattle object
	newBattle.left = req.body.left;
	newBattle.right = req.body.right;
	newBattle.winner = req.body.winner;
	
	// add newBattle to our data (db.battles array)
	db.battles.push(newBattle);
	
	// respond with the new battle (res.json(newBattle))
	res.json(newBattle);
});

app.listen(process.env.PORT || 8000); //pass the port we need to run server on