var Backbone = require('backbone');

var SearchView = require('../Search/SearchView');
var DetailView = require('../Details/DetailView');

var MainView = Backbone.View.extend({

	createDetailView: function () {
		var _this = this;
		var view = new DetailView({
			// onSelect gets used by DetailView to determine what happens when
			// you click the 'Select a hero' button.
			onSelect: function () {
				// Open the SearchView and pass a callback function to tell
				// it what to tell the CharacterListView to do when one of its
				// CharacterListItemViews is clicked.
				_this.searchView.open(function onItemClick(character) {
					var url = 'main/';
					
					// Pass the character that was clicked on to the DetailView
					view.setCharacter(character);

					// Close the search
					_this.searchView.close();

					// Build the new hash
					if (_this.details[0].model) {
						url += _this.details[0].model.get('id');
					}

					url += ',';

					if (_this.details[1].model) {
						url += _this.details[1].model.get('id');
					}

					// Update the URL (without triggering the router) so that we
					// can share it or refresh the page.
					Backbone.history.navigate(url);
				});
			}
		});
		return view;
	},

	initialize: function (options) {
		var _this = this;

		this.searchView = new SearchView();

		this.details = [
			this.createDetailView(),
			this.createDetailView()
		];
	},

	openSearch: function (callback) {
		this.searchView.open(callback);
	},

	render: function () {
		var _this = this;
		this.$el.html(this.template());
		this.searchView.render();
		this.$('.search-region').append(this.searchView.$el);
		this.details.forEach(function (view) {
			_this.$('.detail-region').append(view.$el);
			view.render();
		});
	},

	template: function () {
		return `
			<div class="detail-region"></div>
			<div class="search-region"></div>
		`;
	}

});

module.exports = MainView;