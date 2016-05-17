$ = require('jquery');
var _ = require('underscore');
var PageView = require('./base');
var dom = require('ampersand-dom');
var gsap = require('../vendor/gsap/uncompressed/TweenMax.js');
var owlCarousel = require('../vendor/owl.carousel.js');
var responsImg = require('../vendor/responsiveimage/jquery.responsImg.js');


var Content = PageView.extend({

	events: {
		"click .Location-teaser-tab-item":"_handleTabbarClick"
	},

	hookBeforeHide: function(){

	},

	hookInRender: function () {
		var self = this;
		TweenMax.delayedCall(0.1, this.initializeSlider, [], this); // Slider
		this.bindResponsimg();
		this.Tabbars = this.queryAll('.Location-teaser-tab-item');
	},

	initializeSlider: function(){

		$('.Carousel .Carousel-body').owlCarousel({
			    loop:true,
			    margin:0,
			    nav:true,
			    items:1
		});

		$('.Carousel--testimonials .Carousel-body').owlCarousel({
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
	},

	_handleTabbarClick: function(event){
			if(!dom.hasClass(event.delegateTarget, 'active')){
				_.each(this.Tabbars, function(item, index){
					dom.removeClass(item, 'active')
				});
				dom.addClass(event.delegateTarget, 'active');
			}
	}

});

module.exports = Content;
