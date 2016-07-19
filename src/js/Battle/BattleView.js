// Shows the realtime battle results.
var $ = require('jquery');
var Backbone = require('backbone');

var WinnerView = require('../Winner/WinnerView');
var BattleModel = require('./BattleModel');

var BattleView = Backbone.View.extend({

	className: 'battle',

	render: function () {
		this.$el.html(this.template());
	},

	template: function () {
		return `
			<ul class="log"></ul>
			<div class="winner-slot"></div>
		`;
	},

	fight: function (character1, character2) {
		// * use BattleManager to generate a fight between character1 and character2
		// * display the results
		var li;
		var _this = this;
		var results = BattleManager.narrativeBattle(character1.stats.attributes, character2.stats.attributes);

		// Define left, right, and winner variables to pass into new BatteModel

		var left = character1.get('id');
		var right = character2.get('id');
		var winner = null;

		if (left === results.winner.id) {
			winner = character1;
		} else if (right === results.winner.id) {
			winner = character2;
		}

		// console.log(results);
		
		for (var i = results.fightData.length - 1; i >= 0; i--) {
			li = $('<li>');
			li.text(results.fightData[i].message);
			this.$('.log').append(li);
		}

		var counter = results.fightData.length - 1;

		var intervalId = setInterval(function () {

			if (counter === 0) {
				clearInterval(intervalId);
				_this.showWinner(winner);
				// Add the results from outer scope to the battles of character1 and character2
				character1.battles.add(battleResults);
				character2.battles.add(battleResults);
			}

			_this.$('.log')
				.children() // Get all the children
				.eq(counter) // Find the element at the index of counter
				.addClass('visible'); // Add the class 'visible'

			counter--;

		}, 2000);

		var battleResults = new BattleModel({
			left: left,
			right: right,
			winner: winner === null ? null : winner.get('id')
		});

		// Posts new instance of BattleModel (battleResults) to server
		battleResults.save();
	},

	showWinner: function (winner) {
		var winnerView = new WinnerView({ model: winner });
		winnerView.render();
		this.$('.winner-slot').append(winnerView.$el);
	},

	reset: function () {
		this.$('.log').empty();
	}

});

module.exports = BattleView;