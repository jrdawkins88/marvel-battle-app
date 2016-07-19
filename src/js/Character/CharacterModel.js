var Backbone = require('backbone');

var StatsModel = require('../Stats/StatsModel');
var api = require('../API/api');
var BattleCollection = require('../Battle/BattleCollection');

var CharacterModel = Backbone.Model.extend({

    initialize: function () {
        // Get the character's stats
        this.stats = new StatsModel({ id: this.get('id') });
        this.stats.fetch();
        // Get the character's battles
        this.battles = new BattleCollection();
        this.battles.fetch({
            data: {
                characterId: this.get('id')
            }
        });
    },

    url: function () {
        return api.url('characters/' + this.get('id'));
    },

    parse: function (response) {
        // If the model belongs to a collection
        if (this.collection) {
            // The response has already been parsed
            return response;
        }
        return response.data.results[0];
    },

    getThumbnail: function (variant) {
        var thumb = this.get('thumbnail');
        var image = thumb.path;

        if (variant) {
            image += '/' + variant;
        }

         image += '.' + thumb.extension;

         return image;
    },

    getWins: function () {
        var _this = this;
        // use this.battles to return any that are wins
        return this.battles.filter(function (battle) {
            return battle.get('winner') === _this.get('id');
        });
    },

    getLosses: function () {
        // use this.battles to return any that are losses
        var _this = this;
        // use this.battles to return any that are wins
        return this.battles.filter(function (battle) {
            var winner = battle.get('winner');
            return winner !== null && winner !== _this.get('id');
        });  
    }

});

module.exports = CharacterModel;