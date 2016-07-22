// The router connects the urls to actions and events.

var Backbone = require('backbone');

var main = require('../Main/mainController');
var app = require('../App/appController');

var AppRouter = Backbone.Router.extend({

	routes: {
		'': 'home',
        'main': 'main',
        'main/(:left),(:right)': 'main'
	},

	main: function (left, right) {
		main.showMain(left, right);
	},

	home: function () {
		app.showHome();
	}

});

module.exports = AppRouter;