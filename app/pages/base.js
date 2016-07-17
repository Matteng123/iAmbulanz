/*global $*/
// base view for pages
var View = require('ampersand-view');
var dom = require('ampersand-dom');
var _ = require('underscore');
var responsImg = require('../vendor/responsiveimage/jquery.responsImg.js');


var Base = View.extend({

    props: {
        isInitial: [Boolean, true, false],
        isKilled: [Boolean, true, false],
        formModel: [Object, true, '']
    },

    template: function(){
        var content = this.model.pageContent;
        return content;
    },

    render: function(){
        console.log("RENDER", this.isInitial);
        if(!this.isInitial){
            console.log("RENDER width Template");
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
        this.isInitial = true;
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

    cleanup: function(){
        console.log("cleanup");
    },


    _setIsInitial: function(){
        // Set Stuff for Initial
        this.isInitial = true;
    },

});


module.exports = Base;
