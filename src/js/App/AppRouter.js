var Backbone = require('backbone');

var main = require('../Main/mainController');

var AppRouter = Backbone.Router.extend({

	routes: {
        'main': 'main',
        'main/(:left),(:right)': 'main'
	},

	main: function (left, right) {
		main.showMain(left, right);
	}

});

module.exports = AppRouter;