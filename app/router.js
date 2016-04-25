/* global me, app */
var AmpersandRouter = require('ampersand-router');

var FormModel = require('./models/form');
var ContentView = require('./pages/content');
var ContentModel = require('./models/content');
var ContactView = require('./pages/contact');
var ProjectView = require('./pages/project');
var ProjectModel = require('./models/project');


var Router = AmpersandRouter.extend({
    routes: {
        // 'de/kontakt/': 'contact',
        ':i18n/:query/': 'project',
        ':i18n/:query/:page': 'project',
        '(*path)': 'content'
    },

    // ------- ROUTE HANDLERS ---------
    content: function (value) {
        this.trigger('page', new ContentView({
            model: new ContentModel({id:value})
        }));
    },
    project: function (i18n, query, value) {
        if (value == undefined) value = "index.html";
        // console.log("router project: " + i18n +'/'+ query + "/"+ value);
        this.trigger('page', new ProjectView({
            model: new ProjectModel({path:(i18n+'/'+query), id:value})
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