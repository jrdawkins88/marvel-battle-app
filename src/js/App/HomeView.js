// Contains the opening view with a Start button that will swap the region with MainView when clicked.

var Backbone = require('backbone');

var mainController = require('../Main/mainController');

var HomeView = Backbone.View.extend({

	className: 'home',

	events: {
		'click .start': 'handleClickStart'
	},

	render: function () {
		this.$el.html(this.template());
	},

	template: function () {
		return `
			<header class="header">
				<img id="logo" src="images/logo.png">
			</header>
			<p class="headline">Pit Your Favorite Marvel Characters Against Each Other In An Epic Battle</p>
			<div class="hero-image"></div>
			<button class="start"></button>
		`;
	},

	handleClickStart: function () {
		// same as window.location.hash = 'main'
		mainController.showMain();
		Backbone.history.navigate('main');
	}

});

module.exports = HomeView;