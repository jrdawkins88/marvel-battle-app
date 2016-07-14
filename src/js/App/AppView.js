var Backbone = require('backbone');
var HomeView = require('./HomeView');

var AppView = Backbone.View.extend({

	initialize: function () {
		var _this = this;
		this.homeView = new HomeView();
		Backbone.on('app:show', function (view) {
			_this.show(view);
		});
	},

	render: function () {
		this.$el.html(this.template());
		this.show(this.homeView);
	},

	template: function () {
		return `
			<header class="header">
				<img id="logo" src="#">
				<h1>The Marvel Battle Royale</h1>
			</header>
			<main class="page-region"></main>
		`;
	},

	show: function (view) {
		if (this.pageView) {
			this.pageView.remove();
		}

		this.pageView = view;

		view.render();

		this.$('.page-region').append(view.$el);
	}

});

module.exports = AppView;
