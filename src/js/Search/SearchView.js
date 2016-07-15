// Will listen for a Backbone event called 'search' that
// is passed a reference to the DetailView that triggered
// the search.

// SearchView.prototype.open will take a callback function to execute whenever
// a search result is clicked on. In addition, it will add a class to make it
// visible.

var Backbone = require('backbone');

var CharacterCollection = require('../Character/CharacterCollection');
var CharacterListView = require('../Character/CharacterListView');

var SearchView = Backbone.View.extend({

    className: 'search',

    events: {
        'click .search-button': 'handleSearchClick'
    },

    render: function () {
        this.$el.html(this.template());
    },

    template: function () {
        return `
            <div class="list-region"></div>
            <input class="starts-with">
            <button class="search-button">Search</button>
        `;
    },

    handleSearchClick: function () {
        this.collection.fetch({
            // generates a url like http://gateway.marvel.com/api/v1/characters?apikey=...&nameStartsWith=blah
            data: {
                nameStartsWith: this.$('.starts-with').val()
            }
        });
    },

    open: function (onItemClick) {
        if (this.listView) {
            this.listView.remove();
        }

        this.collection = new CharacterCollection();

        this.$el.addClass('is-visible');
        
        this.listView = new CharacterListView({
            collection: this.collection,
            onItemClick: onItemClick
        });

        this.collection.fetch();
        
        this.listView.render();

        this.$('.list-region').append(this.listView.$el);
    },

    close: function () {
        this.$el.removeClass('is-visible');
    }

});

module.exports = SearchView;