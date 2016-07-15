var Backbone = require('backbone');

var mainController = require('../Main/mainController');

var HomeView = Backbone.View.extend({

	events: {
		'click .start': 'handleClickStart'
	},

	render: function () {
		this.$el.html(this.template());
	},

	template: function () {
		return `
			<img class="hero-image" src="#">
			<p>Some kind of cool description of the ensuing battles to come</p>
			<button class="start">Start</button>
		`;
	},

	handleClickStart: function () {
		// same as
		// window.location.hash = 'main'
		mainController.showMain();
		Backbone.history.navigate('main');
	}

});

module.exports = HomeView;