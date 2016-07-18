var Backbone = require('backbone');

// CharacterListItemView
//      * Takes a CharacterModel
//      * Takes an onClick function to specify what it should do when it is
//      clicked.

var CharacterListItemView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click': 'handleClick'
    },

    initialize: function (options) {
        this.onClick = options.onClick;
    },


    render: function () {
        // render every item in this.collection as a CharacterListItemView
        this.$el.html(this.template({
            name: this.model.get('name'),
            portrait: ''
        }));
    },

    template: function (data) {
        return `
            <img class="sm-image" src="#">
            <span>${data.name}</span>
        `;
    },

    handleClick: function () {
        this.onClick(this.model);
    }

});

module.exports = CharacterListItemView;