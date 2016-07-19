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
                description: this.model.get('description'),
                wins: this.model.getWins().length,
                losses: this.model.getLosses().length,
                stats: this.model.stats.toJSON()
            }));
            this.$('.portrait').css('background-image', 'url(' + this.model.getThumbnail('portrait_uncanny') + ')');
        } else {
            this.$el.html(this.emptyTemplate());
            this.$('.portrait').css('background-image', 'url(images/placeholder.jpg)');
        }
    },

    template: function (data) {
        return `
            <div class="portrait reveal"></div>
            <h2 class="detail-name">${data.name}</h2>
            <p>${data.description}</p>
            <span>Wins: ${data.wins}</span>
            <span>Losses: ${data.losses}</span>
            <ul>
                <li style="width: ${data.stats.strength / 7 * 100}%">Strength: ${data.stats.strength}</li>
                <li style="width: ${data.stats.durability / 7 * 100}%">Durability: ${data.stats.durability}</li>
                <li style="width: ${data.stats.fighting / 7 * 100}%">Fighting: ${data.stats.fighting}</li>
                <li style="width: ${data.stats.energy / 7 * 100}%">Energy: ${data.stats.energy}</li>
                <li style="width: ${data.stats.speed / 7 * 100}%">Speed: ${data.stats.speed}</li>
                <li style="width: ${data.stats.intelligence / 7 * 100}%">Intelligence: ${data.stats.intelligence}</li>
            </ul>
            <button class="select-button">Select a hero</button>
        `;
    },

    emptyTemplate: function () {
        return `
            <div class="portrait"></div>
            <button class="select-button">Select a hero</button>
        `;
    },

    handleSelectClick: function () {
        this.onSelect();
    },

    setCharacter: function (character) {
        if (this.model) {
            this.model.battles.off('update add', this.render);
            this.model.stats.off('sync', this.render);
        }
        this.model = character;
        // Re-render once the battles have been fetched
        this.model.battles.on('update add', this.render);
        this.model.stats.on('sync', this.render);
        this.render();
    }

});

module.exports = DetailView;