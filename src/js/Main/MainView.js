var Backbone = require('backbone');

var DetailView = require('../Details/DetailView');

var MainView = Backbone.View.extend({

	initialize: function () {
		this.detailViews = [
			new DetailView(),
			new DetailView()
		];
	},

	render: function () {
		var _this = this;
		this.$el.html(this.template());
		this.detailViews.forEach(function (view) {
			view.render();
			_this.$('.detail-region').append(view);
		});
	},

	template: function () {
		return `
			<div class="detail-region"></div>
		`;
	}

});

module.exports = MainView;