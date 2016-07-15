var Backbone = require('backbone');

var StatsModel = require('../Stats/StatsModel');
var api = require('../API/api');

var CharacterModel = Backbone.Model.extend({

    initialize: function () {
        this.stats = new StatsModel({ id: this.get('id') });
        this.stats.fetch();
    },

    url: function () {
        return api.url('characters/' + this.get('id'));
    },

    parse: function (response) {
        return response.data.results[0];
    }

});

module.exports = CharacterModel;