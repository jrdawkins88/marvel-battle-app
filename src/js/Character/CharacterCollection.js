var Backbone = require('backbone');

var api = require('../API/api');

var CharacterModel = require('./CharacterModel');

var CharacterCollection = Backbone.Collection.extend({

	model: CharacterModel, // Default = Backbone.Model

    url: api.url('characters'),

    parse: function (response) {
        return response.data.results;
    }

});

module.exports = CharacterCollection;