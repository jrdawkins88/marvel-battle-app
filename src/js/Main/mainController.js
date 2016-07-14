var Backbone = require('backbone');

var MainView = require('./MainView');

module.exports = {

	showMain: function () {
		Backbone.trigger('app:show', new MainView());
	}

};