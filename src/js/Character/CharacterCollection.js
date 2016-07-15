var Backbone = require('backbone');

var api = require('../API/api');

var CharacterCollection = Backbone.Collection.extend({

    url: api.url('characters'),

    parse: function (response) {
        return response.data.results;
    }

});

module.exports = CharacterCollection;