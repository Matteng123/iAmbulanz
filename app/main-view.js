/*global me, app*/
var $ = require('jquery');
var _ = require('underscore');
var View = require('ampersand-view');
var dom = require('ampersand-dom');
var ViewSwitcher = require('ampersand-view-switcher');
var gsap = require('./vendor/gsap/uncompressed/TweenMax.js');
var gsap = require('./vendor/gsap/uncompressed/plugins/ScrollToPlugin.js');

var MainView = View.extend({

    props: {
        isMobile: false,
        pageTitle: [String, true, 'iAmbulanz']
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
            headerBody: '.Header-body',
            nav: '.nav',
            navmain: '.nav-main',
            togglemenu: '.togglemenu'
        });
        
        // initial view

         // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.queryByHook('switcher'), {
            waitForRemove: true,
            hide: function (oldView, newView, cb) {
                // it's inserted and rendered for me so we'll add a class 
                // that has a corresponding CSS transition.

                console.log("old View", oldView);
                console.log("new View", newView);

                if(oldView && oldView.el){
                    oldView.hookBeforeHide();
                    // TweenMax.set(oldView.el, { opacity:0 });
                    TweenMax.to(oldView.el, 0.8, { opacity:0, delay:0.2 });
                    TweenMax.to(window, 1, {scrollTo:{y:0}});
                }

                // give it time to finish (yes there are other ways to do this)
                setTimeout(cb, 1000);
            },

            show: function (newView, oldView) {
                
                // it's inserted and rendered for me
                document.title = _.result(newView.model, 'pageTitle');
                // document.getElementsByClassName('page')[0].scrollTop = self.cacheScroll;

                
                TweenMax.set(newView.el, { opacity:0 });
                TweenMax.to(newView.el, 1.2, {opacity:1, delay:0.5, onComplete:function(){
                    newView.el.setAttribute("style", " ");
                    newView.hookAfterRender();
                }});

            }
        });

        // setting a favicon for fun (note, it's dynamic)
        // setFavicon('/images/ampersand.png');

        return this;
    },

    handleNewPage: function (view) {
        
        // TRACKING
        if(typeof ga != 'undefined'){
            ga('send', 'pageview', {
                'page': app.router.history.location.pathname,
                'title': view.model.pageTitle
            });
        }

        // SWICTH THE VIEW
        this.pageSwitcher.set(view);
        // UPDATE PAG NAV
        this.updateActiveNav();
    },

    handleInitialPage: function (view) {
        var self = this;
        view.handleInitialPage();

        view.el = this.query('.view');
        view.render();

        this.pageSwitcher.current = view;

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    handleTogglemenu: function (e){
        console.log("handleTogglemenu");


        if( dom.hasClass(this.header, 'Header--open') || e == undefined){
            dom.setAttribute(this.header, 'style', '');
            dom.removeClass(this.header, 'Header--open');
        } else {
            dom.setAttribute(this.header, 'style', 'margin-top:'+this.headerBody.offsetHeight+'px');
            dom.addClass(this.header, 'Header--open');
        }
    },

    handleLinkClick: function (e) {
        var aTag = e.delegateTarget,
            self = this,
            hash = '',
            path = '';
        
        if (aTag.hash !== undefined && aTag.hash.length >= 1){
            hash = aTag.hash;
        }

        path =  aTag.hash !== undefined
                ? aTag.pathname+hash
                : aTag.getAttribute('xlink:href');

        this.doLinkClick(path, e, aTag);

        dom.removeClass(this.togglemenu, 'active');
    },

    doLinkClick: function(path, e, tag){
        var local = tag.host === window.location.host,
            link = this.query(e.delegateTarget),
            href = window.location.href,
            aUrl = e.delegateTarget.href,
            attr = e.delegateTarget.getAttribute('data-value') || undefined;

        if ( $(tag).data('animation') != undefined ){
            app.pageAnimation = $(tag).data('animation');
        } else {
            app.pageAnimation = "scroll";
        }
        // console.log("pageHash: ",  window.location.pathname +" - "+ tag.pathname );

        if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && tag.getAttribute("target") !== "_blank") {
            e.preventDefault();

            app.pageHash = tag.hash;
            if(dom.hasClass(tag, 'anchor') && window.location.pathname == tag.pathname ){
                // console.log(app);
                this.scrollTo();
                if(dom.hasClass(tag, 'anchor-close') )
                    this.handleTogglemenu();
            } else {
                // this.closeMainMenu();
                app.navigate(path);
                // close menu container
                this.handleTogglemenu();
            }
        } 
    },

    scrollTo: function(){
        if (app.pageHash.length >= 1){
            var id = this.query(app.pageHash);
            TweenMax.to(window, 1.2, {scrollTo:{y:id.offsetTop}, ease:Power2.easeOut});
        }
    },

    handleDropdownMenu: function(e){
        if(('.box-dorpdown-menu')){
            $(e.delegateTarget).parents()
                .toggleClass('active')
                .siblings()
                .removeClass('active');
        }
    },

    closeMainMenu: function(){
        if ( this.mobile() || this.mqSize ){
            console.log(this.navmain);
            dom.addClass( this.navmain, "close");
        }
    },

    initMenu: function(){
        this.resizeMenu();
    },

    resizeMenu: function (){
        // console.log("resize Menu");
        var self = this;

        var menuItemWidth = 0,
            menuAreaWidth = 0;

        menuAreaWidth = $(this.header).width() - 256; //- 166;
        $('.menu > li').each(function(index, el) {
            menuItemWidth = menuItemWidth + $(this).find('a').outerWidth();
        });
    
        if(menuItemWidth > menuAreaWidth){
            dom.addClass(self.header, 'mobile');
            dom.addClass(self.page, 'mobile');
        }else{
            dom.removeClass(self.header,'mobile');
            dom.removeClass(self.page,'mobile');
            dom.removeClass(self.togglemenu, 'active');
            dom.removeClass(document.body, 'overlayer');
        }
    },

    rotationMenu: function (){
        this.resizeMenu();
    },

    updateActiveNav: function () {
        var path = window.location.pathname.slice(1);

        this.queryAll('.nav-main a[href]').forEach(function (aTag) {

            var aPath = aTag.pathname.slice(1);

            if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
                // start film nicht aktiv !!
                if(aPath != ''){
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