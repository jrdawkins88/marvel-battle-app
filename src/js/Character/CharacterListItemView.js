var Backbone = require('backbone');

// CharacterListItemView
//      * Takes a CharacterModel
//      * Takes an onClick function to specify what it should do when it is
//      clicked.

var CharacterListItemView = Backbone.View.extend({

    className: 'character-item',

    tagName: 'li',

    events: {
        'click': 'handleClick'
    },

    initialize: function (options) {
        this.onClick = options.onClick;
        // If the stats model is updated
        this.model.stats.once('sync', this.render.bind(this));
    },

    render: function () {
        // render every item in this.collection as a CharacterListItemView
        this.$el.html(this.template({
            name: this.model.get('name'),
            portrait: ''
        }));

        if (!this.model.stats.loaded) {
            this.$el.addClass('disabled');
        } else {
            this.$el.removeClass('disabled');
        }
    },

    template: function (data) {
        return `
            <img class="sm-image" src="${this.model.getThumbnail('standard_large')}">
            <div class="thumb-name">${data.name}</div>
        `;
    },

    handleClick: function () {
        if (this.model.stats.loaded) {
            this.onClick(this.model);
        }
    }

});

module.exports = CharacterListItemView;