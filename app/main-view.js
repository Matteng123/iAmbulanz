/*global me, app*/

import _ from 'underscore';
import View from 'ampersand-view';
import dom from 'ampersand-dom';
import ViewSwitcher from 'ampersand-view-switcher';
import "ScrollToPlugin";
import "TweenMax";

let MainView = View.extend({

    props: {
        pageTitle: [String, true, 'iAmbulanz'],
        isStickyOff: ['boolean', false, false],
        isSticky: ['boolean', false, false]
    },

    events: {
        'click a[href]': 'handleLinkClick',
        'click .Header-toggle': 'handleTogglemenu',
        'click .nav-holder #close': 'handleTogglemenu'
    },

    render: function () {
        var self = this;

        // cache elements
        this.cacheElements({
            page: '#page',
            main: '#main',
            footer: '#footer',
            header: '.Header',
            headerBody: '.Header .Header-body',
            nav: '.nav',
            navmain: '.nav-main',
            togglemenu: '.togglemenu'
        });

        // initial view

         // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.queryByHook('switcher'), {
            waitForRemove: true,
            hide: function (oldView, cb) {
                if(oldView && oldView.el){
                    oldView.hookBeforeHide();
                    TweenMax.to(oldView.el, 0.4, { opacity:0, delay:0.2 });
                    TweenMax.to(window, 0.6, {scrollTo:{y:0}});
                }
                setTimeout(cb, 600);
            },

            show: function (newView) {

                document.title = _.result(newView.model, 'pageTitle');

                TweenMax.set(newView.el, { opacity:0 });
                TweenMax.to(newView.el, 0.4, {opacity:1, delay:0.2, onComplete:function(){
                    newView.el.setAttribute("style", " ");
                    newView.hookAfterRender();
                }});

            }
        });

        window.addEventListener('scroll', function() {
          if(window.scrollY > self.header.offsetHeight+50 && !self.isSticky){
            self.isSticky = true;
            dom.addClass(document.body, 'Header--sticky-open');
          } else if(window.scrollY < self.header.offsetHeight+50 && self.isSticky){
            self.isSticky = false;
            dom.removeClass(document.body, 'Header--sticky-open');
          }
        });

        // setting a favicon for fun (note, it's dynamic)
        // setFavicon('/images/ampersand.png');

        // facebook

        // FB.init({
        //   appId      : '1050812854954398',
        //   xfbml      : true,
        //   version    : 'v2.7'
        // });

        // FB.api(
        //   "/iAmbulanz?fields=access_token",
        //   function (response) {
        //     console.log('api', response);
        //     if (response && !response.error) {
        //       console.log(response);
        //       /* handle the result */
        //     }
        //   },{
        //     "access_token" : '408ec553aa3edeb7470c7a5040e475b2'
        //   }
        // );

        // {page-id}?fields=access_token

        // FB.api(
        //   "/iAmbulanz/ratings",
        //   function (response) {
        //     console.log('api', response);
        //     if (response && !response.error) {
        //       console.log(response);
        //       /* handle the result */
        //     }
        //   },{
        //     "access_token" : '408ec553aa3edeb7470c7a5040e475b2'
        //   }
        //
        // );

        return this;
    },

    handleNewPage: function (view) {

        // TRACKING
        if(typeof ga != 'undefined'){
            ga('send', 'pageview', {
                'page': App.router.history.location.pathname,
                'title': view.model.pageTitle
            });
        }

        // SWITCH THE VIEW
        this.pageSwitcher.set(view);

        // UPDATE PAG NAV
        this.updateActiveNav();
    },

    handleInitialPage: function (view) {
        var self = this;
        view.handleInitialPage();

        view.el = this.query('.Application-view');
        view.render();

        this.pageSwitcher.current = view;

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    handleTogglemenu: function (e){
        if( dom.hasClass(this.header, 'Header--open') || e === undefined){
            this._closeToggleMenu();
        } else {
            this._openToggleMenu();
        }
    },

    _openToggleMenu: function(){
        //dom.setAttribute(this.header, 'style', 'margin-top:'+this.headerBody.offsetHeight+'px');
        TweenMax.to(this.header, 0.5, {css:{marginTop:this.headerBody.offsetHeight}});
        dom.addClass(this.header, 'Header--open');
    },

    _closeToggleMenu: function(){
        dom.setAttribute(this.header, 'style', '');
        dom.removeClass(this.header, 'Header--open');
        TweenMax.to(window, 1, {scrollTo:{y:0}});
    },

    handleLinkClick: function (e) {
        var aTag = e.delegateTarget,
            self = this,
            hash = '',
            path = '';



        if (aTag.hash !== undefined && aTag.hash.length >= 1){
            hash = aTag.hash;
        }

        path = aTag.pathname + aTag.search;

        this._doLinkClick(path, e, aTag);

        this._closeToggleMenu();
    },

    _doLinkClick: function(path, e, tag){
        var local = tag.host === window.location.host;

        // console.log("pageHash: ",  window.location.pathname +" - "+ tag.pathname );

        if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && tag.getAttribute("target") !== "_blank") {
            e.preventDefault();


                // this.closeMainMenu();
                App.navigate(path);
                // close menu container
                this.handleTogglemenu();

        }
    },

    _scrollToSection: function(){
        if (App.pageHash.length >= 1){
            var id = this.query(App.pageHash);
            TweenMax.to(window, 1.2, {scrollTo:{y:id.offsetTop}, ease:Power2.easeOut});
        }
    },


    updateActiveNav: function () {
        var path = window.location.pathname.slice(1);
        // console.log("updateActiveNav", path);

        this.queryAll('.Header a[href]').forEach(function (aTag) {

            var aPath = aTag.pathname.slice(1);

            if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
                // start film nicht aktiv !!
                if(aPath !== ''){
                    dom.addClass(aTag.parentNode, 'active');
                }
            } else {
                dom.removeClass(aTag.parentNode, 'active');
            }
        });
    },

    mobile: function (){
        isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        if ( isMobile.any() === null ){
            return false;
        } else{
            return true;
        }
    }


});

module.exports = MainView;
