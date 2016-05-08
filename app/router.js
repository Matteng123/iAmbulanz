/* global me, app */
var AmpersandRouter = require('ampersand-router');

var FormModel = require('./models/form');
var ContentView = require('./pages/content');
var HomeView = require('./pages/home');
var ContentModel = require('./models/content');
var ContactView = require('./pages/contact');


var Router = AmpersandRouter.extend({
    routes: {
        '': 'home',
        // 'de/kontakt/': 'contact',
        // ':i18n/:query/': 'project',
        // ':i18n/:query/:page': 'project',
        '(*path)': 'content'
    },

    // ------- ROUTE HANDLERS ---------
    home: function (value) {
        console.log("HOME");
        this.trigger('page', new HomeView({
            model: new ContentModel({id:value})
        }));
    },
    content: function (value) {
        console.log("CONTENT");
        this.trigger('page', new ContentView({
            model: new ContentModel({id:value})
        }));
    },
    contact: function () {
        value = '/kontakt';
        this.trigger('page', new ContactView({
            model: new ContentModel({id:value}),
            form: new FormModel({id:"sendEmail.php"})
        }));
    }
});

module.exports = Router;