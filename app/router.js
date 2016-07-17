/* global me, app */
var AmpersandRouter = require('ampersand-router');

var FormModel = require('./models/form');
var ContentView = require('./pages/content');
var ContentModel = require('./models/content');
var ContactView = require('./pages/contact');


var Router = AmpersandRouter.extend({
    routes: {
        // 'de/kontakt/': 'contact',
        // ':i18n/:query/': 'project',
        // ':i18n/:query/:page': 'project',
        '(*path)': 'content'
    },

    // ------- ROUTE HANDLERS ---------
    content: function (value) {
        this.trigger('page', new ContentView({
            model: new ContentModel({id:value}),
            formModel: new FormModel()
        }));
    }
});

module.exports = Router;
