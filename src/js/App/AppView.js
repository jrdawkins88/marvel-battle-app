// AppView contains the entire app. Shows Homeview initially.

var Backbone = require('backbone');
var HomeView = require('./HomeView');

var AppView = Backbone.View.extend({

	className: 'app',

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
				<img id="logo" src="images/logo.png">
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
