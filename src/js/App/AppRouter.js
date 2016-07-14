var Backbone = require('backbone');

var main = require('../Main/mainController');

var AppRouter = Backbone.Router.extend({

	routes: {
		'main': 'main'
	},

	main: function () {
		main.showMain();
	}

});

module.exports = AppRouter;