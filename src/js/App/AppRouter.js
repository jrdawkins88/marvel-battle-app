var Backbone = require('backbone');

var main = require('../Main/mainController');

var AppRouter = Backbone.Router.extend({

	routes: {
        'main': 'main',
        'main/,': 'main',
        'main/,:right': 'right',
        'main/:left,': 'main',
        'main/:left,:right': 'main'   // /main/48102,23812
	},

	main: function (left, right) {
		main.showMain(left, right);
	},

    right: function (right) {
        main.showMain(null, right);
    }

});

module.exports = AppRouter;