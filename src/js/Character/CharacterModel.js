var Backbone = require('backbone');

var StatsModel = require('../Stats/StatsModel');
var api = require('../API/api');
var BattleCollection = require('../Battle/BattleCollection');

var CharacterModel = Backbone.Model.extend({

    initialize: function () {
        this.stats = new StatsModel({ id: this.get('id') });
        this.battles = new BattleCollection();
        this.battles.fetch({
            data: {
                characterId: this.get('id')
            }
        });
        this.stats.fetch();
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
    }

});

module.exports = CharacterModel;