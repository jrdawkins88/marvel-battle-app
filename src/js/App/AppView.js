// AppView contains the entire app. Shows Homeview initially.

var Backbone = require('backbone');
var HomeView = require('./HomeView');

var AppView = Backbone.View.extend({

	className: 'app',

	// creates a new instance of HomeView and shows it
	initialize: function () {
		var _this = this;
		this.homeView = new HomeView();
		Backbone.on('app:show', function (view) {
			_this.show(view);
		});
	},

	render: function () {
		// builds the html with the template
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
		// clear out the div.page-region if there's a view in it
		if (this.pageView) {
			this.pageView.remove();
		}

		this.pageView = view;

		// render the pageView
		view.render();

		// append it to the div.page-region
		this.$('.page-region').append(view.$el);
	}

});

module.exports = AppView;
