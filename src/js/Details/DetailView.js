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
        this.render = this.render.bind(this);
    },

    render: function () {
        if (this.model) {
            this.$el.html(this.template({
                name: this.model.get('name'),
                wins: this.model.getWins().length,
                losses: this.model.getLosses().length
            }));
        } else {
            this.$el.html(this.emptyTemplate());
        }
    },

    template: function (data) {
        return `
            <img src="#" class="lg-image">
            <h1 class="detail-name">${data.name}</h1>
            <p>${data.description}</p>
            <span>Wins: ${data.wins}</span>
            <span>Losses: ${data.losses}</span>
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
        if (this.model) {
            this.model.battles.off('update', this.render);
        }
        this.model = character;
        // Re-render once the battles have been fetched
        this.model.battles.on('update', this.render);
        this.render();
    }

});

module.exports = DetailView;