// Shows the realtime battle results.
var $ = require('jquery');
var Backbone = require('backbone');

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
		var results = BattleManager.narrativeBattle(character1.stats.attributes, character2.stats.attributes);
		var li;
		var _this = this;
		
		for (var i = results.fightData.length - 1; i >= 0; i--) {
			li = $('<li>');
			li.text(results.fightData[i].message);
			this.$('.log').append(li);
		}

		var counter = results.fightData.length - 1;

		var intervalId = setInterval(function () {

			if (counter === 0) {
				clearInterval(intervalId);
			}

			_this.$('.log')
				.children() // Get all the children
				.eq(counter) // Find the element at the index of counter
				.addClass('visible'); // Add the class 'visible'

			counter--;

		}, 2000);

		// console.log(results);
		// var winnerView = new WinnerView({ winner: winner });
	},

	reset: function () {
		this.$('.log').empty();
	}

});

module.exports = BattleView;