var Backbone = require('backbone');

var HomeView = require('./HomeView');

module.exports = {

    showHome: function () {
        var view = new HomeView();
        Backbone.trigger('app:show', view);  //<--- trying to make the logo a link back to the home view
    }

};