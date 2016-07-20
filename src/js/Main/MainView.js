var Backbone = require('backbone');

var SearchView = require('../Search/SearchView');
var DetailView = require('../Details/DetailView');
var BattleView = require('../Battle/BattleView');

var MainView = Backbone.View.extend({

	className: 'main',

	events: {
		'click .fight-button': 'handleFightClick'
	},

	initialize: function (options) {
		var _this = this;

		Backbone.on('battle:reset', this.resetBattle.bind(this));

		this.searchView = new SearchView();
		this.battleView = new BattleView();

		this.details = [
			this.createDetailView(),
			this.createDetailView()
		];
	},

	render: function () {
		var _this = this;
		this.$el.html(this.template());
		this.searchView.render();
		this.battleView.render();
		this.$('.search-region').append(this.searchView.$el);
		this.details.forEach(function (view) {
			_this.$('.detail-region').append(view.$el);
			view.render();
		});
	},

	template: function () {
		return `
			<header class="header small">
				<img id="logo" src="images/logo.png">
			</header>
			<h1 class="headline">Choose Your Opponents</h1>
			<div class="detail-region cf"></div>
			<button class="fight-button"></button>
			<div class="search-region"></div>
			<div class="battle-region"></div>
		`;
	},

	createDetailView: function () {
		var _this = this;
		var view = new DetailView({
			// onSelect gets used by DetailView to determine what happens when you click the 'Select a hero' button.
			onSelect: function () {
				// Reset the BattleView if it has any contents
				_this.battleView.reset();
				// Open the SearchView and pass a callback function to tell it what to tell the CharacterListView to do when one of its CharacterListItemViews is clicked.
				_this.searchView.open(function onItemClick(character) {
					// Pass the character that was clicked on to the DetailView
					view.setCharacter(character);

					// Close the search
					_this.searchView.close();

					_this.updateURL();
					_this.updateButton();
				});
			}
		});
		return view;
	},

	updateButton: function () {
		// Check to see if both DetailViews have a model set - if they do, add an active state to the battle button.
		if (this.details[0].model && this.details[1].model) {
			this.$('.fight-button').addClass('active');
		}
	},

	updateURL: function () {
		var url = 'main/';
		// Build the new hash
		if (this.details[0].model) {
			url += this.details[0].model.get('id');
		}

		url += ',';

		if (this.details[1].model) {
			url += this.details[1].model.get('id');
		}

		// Update the URL (without triggering the router) so that we can share it or refresh the page.
		Backbone.history.navigate(url);
	},

	handleFightClick: function () {
		var left = this.details[0].model;
		var right = this.details[1].model;

		this.battleView.reset();

		if (!left.stats.loaded) {
			left.once('sync', this.handleFightClick.bind(this));
			return;
		};

		if (!right.stats.loaded) {
			right.once('sync', this.handleFightClick.bind(this));
			return;
		};

		this.$('.battle-region').append(this.battleView.$el);
		this.battleView.fight(this.details[0].model, this.details[1].model);
	},

	resetBattle: function () {
		this.battleView.reset();
	}

});

module.exports = MainView;