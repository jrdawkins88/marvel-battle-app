// Will listen for a Backbone event called 'search' that is passed a reference to the DetailView that triggered the search.

// SearchView.prototype.open will take a callback function to execute whenever a search result is clicked on. In addition, it will add a class to make it visible.

var Backbone = require('backbone');

var CharacterCollection = require('../Character/CharacterCollection');
var CharacterListView = require('../Character/CharacterListView');

var SearchView = Backbone.View.extend({

    className: 'search',

    events: {
        'click .search-button': 'handleSearchClick'
    },

    initialize: function () {
        this.collection = new CharacterCollection();
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
        this.$('.starts-with').val('');
    },

    // open() creates a CharacterListView and renders it. open() passes the CharacterListView
    // a callback function that was passed into itself. This function (onItemClick) describes
    // what should happen when one of the search results is clicked.
    open: function (onItemClick) {
        // Remove the search results that were previously there.
        if (this.listView) {
            this.listView.remove();
        }

        // Display the element.
        this.$el.addClass('is-visible');
        
        // Create a new list of search results.
        this.listView = new CharacterListView({
            collection: this.collection,
            onItemClick: onItemClick // This is where we pass the callback function that was passed into open();
        });

        // Fetch the collection (to show some initial results).
        this.collection.fetch();
        
        // Render the search results.
        this.listView.render();

        // Append it to the DOM.
        this.$('.list-region').append(this.listView.$el);
    },

    // close() will simply remove the is-visible class, hiding the element.
    close: function () {
        this.$el.removeClass('is-visible');
    }

});

module.exports = SearchView;