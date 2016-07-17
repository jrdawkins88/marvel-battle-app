var Backbone = require('backbone');

var mainController = require('../Main/mainController');

var WinnerView = Backbone.View.extend({

	events: {

		'click .go-again': 'handleGoAgain'

	},

	initialize: function (options) {
		this.winner = options.winner;
	},

	render: function () {
		this.$el.html(this.template({
			thumbnail: this.model.getThumbnail('portrait_uncanny')
		}));
	},

	template: function (data) {
		return `
			<img src="${data.thumbnail}">
			<h1>${this.model.name} + ' is the winner!'</h1>
			<button class="go-again">Go Again?</button>
		`;
	},

	handleGoAgain: function () {
		mainController.showMain();
		Backbone.history.navigate('main');
	}
	
});