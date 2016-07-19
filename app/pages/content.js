$ = require('jquery');
var _ = require('underscore'),
		PageView = require('./base'),
		MapModel = require('../models/mapbox'),
		dom = require('ampersand-dom'),
		gsap = require('../vendor/gsap/uncompressed/TweenMax.js'),
		owlCarousel = require('../vendor/owl.carousel.js'),
		responsImg = require('../vendor/responsiveimage/jquery.responsImg.js'),
		MapLayers = require('../features/mapgl-layers.js'),
		Form = require('../features/form.js');


var Content = PageView.extend(MapLayers),
		Content = Content.extend(Form);

Content = Content.extend({

	events: {
		"click .Location-teaser-tab-item":"_handleTabbarClick",
		"click .Prices-button":"_handlePricebarClick",
		"click .Form-field--radio div":"_handleRadioClick",
		"click .Form-field--checkbox div":"_handleCheckboxClick",
		"click .Form button[type=submit]":"_handleFormSubmitClick"
	},

	hookBeforeHide: function(){

	},

	hookInRender: function () {
		var self = this;

		TweenMax.delayedCall(0.1, this.initializeSlider, [], this); // Slider
		this.bindResponsimg();
		this.Tabbars = this.queryAll('.Location-teaser-tab-item');
		this.Pricebars = this.queryAll('.Prices-button');
		this.Pricetables = this.queryAll('.Prices-table');
		this.Mapbox = this.query('.Map-body');

		if (this.Mapbox !== undefined){
        this.MapConfig = new MapModel({source:'./assets/map/config.json'});
        this.MapConfig.on("sync", function(model, resp){
            self._renderMap(this.Mapbox);
        });
        this.MapConfig.fetch();
    }

	},

	initializeSlider: function(){
		var isloop = (this.queryAll('.Carousel .Carousel-body .item').length > 1) ? true : false;
		console.log("isloop", isloop);
		$('.Carousel .Carousel-body').owlCarousel({
			    loop:isloop,
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
					dom.removeClass(item, 'active');
				});
				dom.addClass(event.delegateTarget, 'active');
			}
	},

	_handlePricebarClick: function(event){
		if(!dom.hasClass(event.delegateTarget, 'active')){
			_.each(this.Pricebars, function(item, index){
				dom.removeClass(item, 'active');
			});
			_.each(this.Pricetables, function(item, index){
				dom.removeClass(item, 'active');
			});
			dom.addClass(this.query(event.delegateTarget.getAttribute('href')), 'active');
			dom.addClass(event.delegateTarget, 'active');
		}
	}

});

module.exports = Content;
