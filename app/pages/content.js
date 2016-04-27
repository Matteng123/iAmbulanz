$ = require('jquery');
var _ = require('underscore');
var PageView = require('./base');
var dom = require('ampersand-dom');
var gsap = require('../vendor/gsap/uncompressed/TweenMax.js');
var owlCarousel = require('../vendor/owl.carousel.js');
var responsImg = require('../vendor/responsiveimage/jquery.responsImg.js');


var Content = PageView.extend({
	
	props:{
		
	},
	
	events: {
		
	},

	hookBeforeHide: function(){

	},

	hookInRender: function () {
		var self = this;

		this.bindResponsimg();
	},

	hookAfterRender: function (){
	},

	bindResponsimg: function (){
		img = $(this.el).find('.responsimg');
		img.responsImg({
			allowDownsize: true
		});
	}

});

module.exports = Content;