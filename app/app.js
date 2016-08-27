/*global app, me, $*/
import _ from 'underscore';
import Router from './router';
import MainView from './main-view';

import $ from 'jquery';
import jQuery from 'jquery';
window.$ = $; window.jQuery = jQuery;

var App = {
    initial: ['boolean', true, true],
    blastoff: function () {
        var self = window.App = this;
        // init our URL handlers and the history tracker
        self.router = new Router();

        let mainView = self.view = new MainView({
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
                console.warn("failed to load: 404");
                view.model.id = '';
                view.model.fetch();
            });
            view.model.fetch();
        });
        // // we have what we need, we can now start our router and show the appropriate page
        self.router.history.start({pushState: true, root: '/'});

    },

    navigate: function (page) {
        let url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }
};

export default window.App = App;
