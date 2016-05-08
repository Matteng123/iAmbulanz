$ = require('jquery');
var _ = require('underscore');
var PageView = require('./base');
var dom = require('ampersand-dom');
var gsap = require('../vendor/gsap/uncompressed/TweenMax.js');
var owlCarousel = require('../vendor/owl.carousel.js');
var responsImg = require('../vendor/responsiveimage/jquery.responsImg.js');


var Home = PageView.extend({
	
	events: {
		
	},

	hookBeforeHide: function(){

	},

	hookInRender: function () {
		console.log("------- HOME View");
		var self = this;
		TweenMax.delayedCall(0.1, this.initializeSlider, [], this); // Slider
		this.bindResponsimg();
	},

	hookAfterRender: function (){
	},

	initializeSlider: function(){

		$('.Application-carousel').owlCarousel({
			    loop:true,
			    margin:0,
			    nav:true,
			    items:1
			});
	},

	bindResponsimg: function (){
		img = $(this.el).find('.responsimg');
		img.responsImg({
			allowDownsize: true
		});
	}

});

module.exports = Home;