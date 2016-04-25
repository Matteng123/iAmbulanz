/*global $*/
// base view for pages
var View = require('ampersand-view');
var dom = require('ampersand-dom');
var _ = require('underscore');
var responsImg = require('../vendor/responsiveimage/jquery.responsImg.js');
require('modernizr');


var Base = View.extend({

    props: {
        isMobile: [Boolean, true, false],
        isInitial: [Boolean, true, false],
        isKilled: [Boolean, true, false]
    },

    slider: {
        feature: {
            loop: true,
            nav: true,
            margin: 0,
            center: true,
            itemsScaleUp: true,
            thumbs: true,
            thumbsPrerendered: true,
            thumbContainerClass: 'owl-carousel-thumb',
            thumbItemClass: 'thumb-item',
            responsive: {
                0:{
                    items: 1
                },
                800:{
                    items: 3
                },
                1200:{
                    items: 4
                }
            }
        },
        galerie: {
            items: 1,
            nav: true,
            dots: false,
            lazyLoad: true,
            loop: true,
            margin: 0,
        },
        basic: {
            loop: false,
            nav: true,
            margin: 0,
            itemsScaleUp: true,
            thumbs: true,
            thumbsPrerendered: true,
            thumbContainerClass: 'owl-carousel-thumb',
            thumbItemClass: 'thumb-item',
            responsive: {
                0:{
                    items: 1
                },
                800:{
                    items: 3
                },
                1200:{
                    items: 5
                }
            }
        }
    },

    template: function(){
        var content = this.model.pageContent;
        return content;
    },

    render: function(){
        // console.log("RENDER");
        if(!this.isInitial){
            this.renderWithTemplate(this);
        }
        
        this.hookInRender();

        this.once('remove', this.cleanup, this);
        
        return this;
    },

    // register keyboard handlers
    registerKeyboardShortcuts: function () {
        /*
        var self = this;
        _.each(this.keyboardShortcuts, function (value, k) {
            // register key handler scoped to this page
            key(k, self.cid, _.bind(self[value], self));
        });
        key.setScope(this.cid);
        */
    },
    
    unregisterKeyboardShortcuts: function () {
        //key.deleteScope(this.cid);
    },

    handleInitialPage: function(){
        // initial Stuff
    },

    hookBeforeHide: function(){

    },

    hookInRender: function(){
        // wird per View überschrieben
    },

    hookAfterRender: function(){

    },

    getScrollXY: function() {
        var scrOfX = 0, scrOfY = 0;
     
        if( typeof( window.pageYOffset ) == 'number' ) {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return [ scrOfX, scrOfY ];
    },

    initSlider: function(el){
        console.log("initSlider");
        var self = this,
            basicSlider = $('#basicslider'),
            featureSlider = $('#featureslider'),
            owl,
            startItem;

        if( basicSlider.length >= 1 ){
            basicSlider.owlCarousel( self.slider.basic );
            startItem = basicSlider.find('.start')
            
            if(startItem.length > 0){
                owl = basicSlider.data('owlCarousel');
                var obsPerPage = owl.options.responsive[owl._breakpoint].items;
                var tPage = Math.floor(startItem.data("index")/obsPerPage);
                basicSlider.trigger('to.owl.carousel', [tPage, 300]);
            }

        }

        if( featureSlider.length >= 1 ){
            featureSlider.owlCarousel( self.slider.feature );
            var items = featureSlider.find('.owl-dots');
            this.showOwlDots(items);
        }
    },

    bindResponisiveInSlider: function($el){
         var img = $el.find('.responsimgowl');
            img.responsImg({
                allowDownsize: true
            });
    },

    showOwlDots: function(items){
        evens = _.filter(items[0].childNodes, function(items, x){ 
            return x % 3 == 0;
        });
        
        _.each(evens, function(items, x){
            dom.addClass(items, "show");
        });
    },

    cleanup: function(){
        //console.log("cleanup");
    },

    handleScroll: function(value){

    },

    _setIsInitial: function(){
        // Set Stuff for Initial
        this.isInitial = true;
    },

    _setIsMobile: function (value){
        this.isMobile = value;
    }

});


module.exports = Base;