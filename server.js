var express = require('express');
var stats = require('battlemanager/data/characters.json');
var app = express();

// creates a function that will serve (host) static files (assets) at a particular directory we indicate (middleware)
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/public'));

app.get('/stats', function (req, res) {  // req = request; res = response
	res.json(stats);
});

app.get('/stats/:id', function (req, res) {
	var id = parseInt(req.params.id);

	var stat = stats.find(function (obj) {
		return obj.id === id;  // meaning when this expression evaluates to true
	});

	res.json(stat);
});

app.listen(8000); //pass the port we need to run server on