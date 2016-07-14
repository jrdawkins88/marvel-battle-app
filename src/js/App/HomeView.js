var Backbone = require('backbone');

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
		Backbone.history.navigate('main', {
			trigger: true
		});
	}

});

module.exports = HomeView;