// DetailView will have a function that sets the
// character model and re-renders it.

var Backbone = require('backbone');

var DetailView = Backbone.View.extend({

    className: 'detail',

    events: {
        'click .select-button': 'handleSelectClick'
    },

    initialize: function (options) {
        this.onSelect = options.onSelect;
    },

    render: function () {
        if (this.model) {
            this.$el.html(this.template(this.model.toJSON()));
        } else {
            this.$el.html(this.emptyTemplate());
        }  
    },

    template: function (data) {
        return `
            <span>${data.name}</span>
            <button class="select-button">Select a hero</button>
        `;
    },

    emptyTemplate: function () {
        return `<button class="select-button">Select a hero</button>`;
    },

    handleSelectClick: function () {
        this.onSelect();
    },

    setCharacter: function (character) {
        this.model = character;
        this.render();
    }

});

module.exports = DetailView;