var Backbone = require('backbone');

// var mainController = require('../Main/mainController');
// var MainView = require('../Main/MainView');

var WinnerView = Backbone.View.extend({

	events: {

		'click .go-again': 'handleGoAgain'

	},

	render: function () {
		if (this.model) {
			this.$el.html(this.template({
				thumbnail: this.model.getThumbnail('portrait_uncanny'),
				name: this.model.get('name')
			}));
		} else {
			this.$el.html(`
				<h1>The fight is a draw!</h1>
				<button class="go-again">Go Again?</button>
			`);
		}
	},

	template: function (data) {
		return `
			<img src="${data.thumbnail}">
			<h1>${data.name} is the winner!</h1>
			<button class="go-again">Go Again?</button>
		`;
	},

	handleGoAgain: function () {
		// mainController.showMain();
		Backbone.history.navigate('main');
		this.reset();
	},

	reset: function () {
		this.$('.winner-slot').empty();
	}
	
});

module.exports = WinnerView;