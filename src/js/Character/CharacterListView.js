var Backbone = require('backbone');

var CharacterListItemView = require('./CharacterListItemView');

// CharacterListView
//      * Takes a CharacterCollection.
//      * Takes an onItemClick function that determines what to do when 
//      one of its CharacterListItemViews is clicked.
//      * Creates/renders/appends a CharacterListItemView for each
//      CharacterModel in the CharacterCollection.
//      * Re-render when the CharacterCollection changes to display new
//      results.

var CharacterListView = Backbone.View.extend({

    tagName: 'ul',

    initialize: function (options) {
        this.onItemClick = options.onItemClick;
        // 'update' triggers when the collection has been successfully fetched
        this.collection.on('update', this.render.bind(this));
    },

    render: function () {
        var _this = this;
        
        if (this.childViews) {
            this.childViews.forEach(function (view) {
                view.remove();
            });
        }

        // render every item in this.collection as a CharacterListItemView
        this.childViews = this.collection.map(function (model) {
            var view = new CharacterListItemView({
                model: model,
                onClick: _this.onItemClick
            });
            return view;
        });

        this.childViews.forEach(function (view) {
            view.render();
            _this.$el.append(view.$el);
        });
    }

});

module.exports = CharacterListView;