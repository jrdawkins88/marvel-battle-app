// Contains the opening view with a Start button that will swap the region with MainView when clicked.

var Backbone = require('backbone');

var mainController = require('../Main/mainController');

var HomeView = Backbone.View.extend({

	className: 'home',

	events: {
		'click .start': 'handleClickStart'
	},

	// renders the HomeView with the template
	render: function () {
		this.$el.html(this.template());
	},

	template: function () {
		return `
			<p class="headline">Pit Your Favorite Marvel Characters Against Each Other In An Epic Battle</p>
			<img class="hero-image" src="images/roster.png">
			<button class="start"></button>
		`;
	},

	handleClickStart: function () {
		// changes the view to MainView using the showMain function from mainController
		// same as window.location.hash = 'main'
		mainController.showMain();
		Backbone.history.navigate('main');
	}

});

module.exports = HomeView;