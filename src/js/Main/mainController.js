// contains the functions needed to build the left and right detailViews on in the mainView

var Backbone = require('backbone');

var MainView = require('./MainView');
var HomeView = require('../App/HomeView');
var CharacterModel = require('../Character/CharacterModel');

module.exports = {

	showMain: function (left, right) {
        var view = new MainView();
        var leftModel;
        var rightModel;

        if (left) {
            leftModel = new CharacterModel({ id: left });
            leftModel.fetch({
                success: function () {
                    // Set the left (0) view's CharacterModel
                    view.details[0].setCharacter(leftModel);
                    view.updateButton();
                }
            });
        }

        if (right) {
            rightModel = new CharacterModel({ id: right });
            rightModel.fetch({
                success: function () {
                    // Set the right (1) view's CharacterModel
                    view.details[1].setCharacter(rightModel);
                    view.updateButton();
                }
            });
        }

		Backbone.trigger('app:show', view);
	}

};