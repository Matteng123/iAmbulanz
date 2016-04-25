/*global app, me, $*/
var _ = require('underscore');
var Router = require('./router');
var domReady = require('domready');
var MainView = require('./main-view');
var App = {
    // this is the the whole app initter
    initial: true,
    pageAnimation: "scroll",
    pageHash: "",

    blastoff: function () {
        var self = window.app = this;
        // init our URL handlers and the history tracker
        this.router = new Router();
        console.log("blastoff");

            // init main view
        var mainView = self.view = new MainView({
            el: document.body
        });

        // ...and render it
        mainView.render();
        // .. watch for changes 
        self.router.on("page", function(view){
            view.model.on("sync", function(model, resp){
                if(!App.initial){
                    mainView.handleNewPage(view);
                } else {
                    mainView.handleInitialPage(view);
                    App.initial = false;
                }
            });
            view.model.on("error", function(model, resp){
                console.log("failed to load");
            });
            view.model.fetch();
        });
        // we have what we need, we can now start our router and show the appropriate page
        self.router.history.start({pushState: true, root: '/'});

    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }
};

module.exports = window.App = App;