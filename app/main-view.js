/*global me, app*/
var $ = require('jquery');
var _ = require('underscore');
var View = require('ampersand-view');
var dom = require('ampersand-dom');
var ViewSwitcher = require('ampersand-view-switcher');
var gsap = require('./vendor/gsap/uncompressed/TweenMax.js');
var gsap = require('./vendor/gsap/uncompressed/plugins/ScrollToPlugin.js');
var L = require('./vendor/mapbox/mapbox.js');
require('modernizr');

var MainView = View.extend({

    props: {
        isMobile: false,
        pageTitle: [String, true, 'Signa'],
        filterSet: [String, true, ''],
        mqSize: [Boolean, true, false],
        cacheScroll: [Number, true, 0],
        showVideo: [Boolean, true, false],
        openVideo: [Boolean, true, false],
        langSwitcher: [Object, true, false]
    },

    events: {
        'click a[href]': 'handleLinkClick',
        'click .box-dorpdown-menu h3': 'handleDropdownMenu',
        
        'click .ovl_anchor': 'handleOverlayer',
        'click .overlayer_close': 'handleOverlayer',
        
        'click .togglemenu': 'handleTogglemenu',
        'click .nav-holder #close': 'handleTogglemenu'
    },

    render: function () {
        var self = this;

        // cache elements
        this.cacheElements({
            page: '#page',
            main: '#main',
            footer: '#footer',
            header: '#header',
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

                console.log(app.pageAnimation);

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

                self.topmenu = document.getElementById('topmenu');
                $topmenu = $(self.topmenu);
                self.topmenu.innerHTML = _.result(newView.model, 'pageTopMenu');

                self.bottommenu = document.getElementById('bottommenu');
                self.bottommenu.innerHTML = _.result(newView.model, 'pageBottomMenu');

                // reset language navigation
                self.langSwitcher = document.querySelector('#i18n_menu');
                self.langSwitcher.replaceChild(_.result(newView.model, 'i18nSwitcher')[0], self.langSwitcher.querySelector('.i18n-inner'));
                
                // it's inserted and rendered for me
                document.title = _.result(newView.model, 'pageTitle');
                // document.getElementsByClassName('page')[0].scrollTop = self.cacheScroll;
                window.scrollTo(0, 0);
                // document.scrollTop = 0;
                
                TweenMax.set(newView.el, { opacity:0 });
                TweenMax.to(newView.el, 1.2, {opacity:1, delay:0.5, onComplete:function(){
                    newView.el.setAttribute("style", " ");
                    newView.hookAfterRender();
                }});
                app.currentPage = newView;

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
        
        // SET IS MOBILE OR NOT
        view._setIsMobile(this.mobile());

        // SWICTH THE VIEW
        this.pageSwitcher.set(view);
        // UPDATE PAG NAV
        this.updateActiveNav();
    },

    handleInitialPage: function (view) {
        var self = this;
        view.handleInitialPage();
        // SET IS MOBILE OR NOT
        view._setIsMobile(this.mobile());

        view.el = this.query('.view');
        view.render();

        this.pageSwitcher.current = view;

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    handleTogglemenu: function (e){
        // console.log(document.body)
        var body = document.body;

        if( dom.hasClass(body, 'show-menu') || e == undefined){
            dom.removeClass(body, 'show-menu');
        } else{
            dom.addClass(body, 'show-menu');
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
        this.mediaQuery('790px');
        if ( this.mobile() || this.mqSize ){
            console.log(this.navmain);
            dom.addClass( this.navmain, "close");
        }
    },

    initScroll: function (){
        var self = this;
        window.addEventListener("scroll", function(e) {
            scroll = document.getElementsByTagName('body')[0].scrollTop;
            if (scroll >= 70 ){
                $('#header').addClass('scroll');
            }else{
                $('#header').removeClass('scroll');
            }
            // self.resizeMenu();
        });
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

    handleOverlayer: function(el){
        el.preventDefault();
        
        var self    = this,
            aTag    = el.delegateTarget,
            body    = document.body,
            output  = document.getElementsByClassName('overlayer_inner')[0],
            tween   = new TimelineMax(),
            tag     = aTag.getAttribute('data-tag'),
            loader  = '<div class="ovl_loader"><div class="spinner"><span></span></div></div>';

        if(dom.hasClass(aTag, 'unselect') || dom.hasClass(aTag.parentNode, 'unselect')){
            return;
        }

        // check classes and set data

        if(dom.hasClass(body, 'overlayer_open') == false) {
            var dataID  = document.getElementById(tag);
            
            dom.addClass(body, 'overlayer_open');
            dom.removeClass(output, 'loaded');

            output.innerHTML = '<div class="frame"><span class="overlayer_close"></span><iframe src="' + tag + '" width="100%" height="700" frameborder="0" name="wohnungen"></iframe></div>' + loader;

            // show iframe loader
            var iframe = document.querySelector('iframe');
            iframe.onload = function() {
                dom.addClass(output, 'loaded');
            };

        } else {
            dom.removeClass(body, 'overlayer_open');
            setTimeout(function(){ output.innerHTML = ''; }, 400);
        }
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
    },

    mediaQuery: function(w){
        if ( Modernizr.mq('only screen and (max-width: '+ w +')') ) {
            this.mqSize = true;
        } else {
            this.mqSize = false;
        }
    }


});

module.exports = MainView;