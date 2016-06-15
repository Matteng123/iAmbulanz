/*global app, me, $*/
jQuery = $ = require('jquery');
var _ = require('underscore');
var Router = require('./router');
var domReady = require('domready');
var MainView = require('./main-view');

var App = {
    // this is the the whole app initter
    initial: true,

    blastoff: function () {
        var self = window.app = this;
        // init our URL handlers and the history tracker
        this.router = new Router();

        var mainView = self.view = new MainView({
            el: document.body
        });

        mainView.render();

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

    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }
};
domReady(function () {
  App.blastoff();
});

module.exports = window.App = App;
