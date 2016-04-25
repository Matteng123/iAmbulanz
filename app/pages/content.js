jQuery = $ = require('jquery');
var _ = require('underscore');
var PageView = require('./base');
var dom = require('ampersand-dom');
var gsap = require('../vendor/gsap/uncompressed/TweenMax.js');
var owlCarousel = require('../vendor/owl.carousel.js');
var responsImg = require('../vendor/responsiveimage/jquery.responsImg.js');


var Content = PageView.extend({
	
	props:{
		isinitial: false,
		container: Object,
		baseUrl: [String, true, window.location.origin],
		mqSize: [Boolean, true, false],

		owlCarouselImage:Array,
		owlCarouselText:Array,
		owlCarouselFullsize:Array,

		form: '',
		formavalues: '',
		// interest: '',
		required: '',
		heroTimeout: '',
		heroInterval:'',
		isScrollTop: [Boolean, true, false]
	},
	
	events: {
		'click .img-overlayer': 'handlePortraitOverlayer',
		'click .portrait-details .icon-close': 'handlePortraitClose',
		'click .portrait-details .close': 'handlePortraitClose',
		'click .tabbar a': 'handleTabbarClick'
	},

	hookBeforeHide: function(){

	},

	hookInRender: function () {
		var self = this;

		// array for input fileds in wohnungsfinder
		self.cacheFilters = [];

		this.container = $(this.el);

		TweenMax.delayedCall(0.1, this.initSlider, [], this); // Slider
		// this.scrollEffects('#page'); // Scrollmagic

		// this.initSlider();
		this.animationHero();
		this.initResize();
		this.bindResponsimg();
	},

	hookAfterRender: function (){
	},

	resetFadehero: function (fadecol){
		var style = 'hidden',
			hidden = '';
		_.each(fadecol, function (el,key){
			dom.addClass(el, hidden);
			hidden = style;
		});
	},
	bindFadehero: function (fadecol, time){
		var self = this,
			// fadecol = this.queryAll('.fadecol'),
			style = 'hidden',
			fadearr = [];

		if( fadecol != undefined && fadecol.length > 1){
			// push in array
			hidden = '';
			_.each(fadecol, function (el,key){
				dom.addClass(el, hidden);
				fadearr.push({ 'dom': el, 'style': hidden });
				hidden = style;
			});
			len = fadearr.length;
			// loop array
			this.heroTimeout = setTimeout( function (){
				this.heroInterval = setInterval(function (){
					_.each(fadearr, function (el,key){
						fadecolstyle = el.style;
						if ( fadecolstyle == '' ) fadeactive = key;
					});
					id = fadeactive + 1;
					if (id >= len) id = 0;
					// active
					dom.addClass(fadearr[fadeactive].dom, style);
					fadearr[fadeactive].style = style;
					// next 
					dom.removeClass(fadearr[id].dom, style);
					fadearr[id].style = '';
				}, 3500);
			},time);
		}

	},
	
	bindResponsimg: function (){
		img = $(this.el).find('.responsimg');
		img.responsImg({
			allowDownsize: true
		});
	},
	
	// initSlider: function(el){
	// 	var slider = $('.owl-carousel, .owl-details'),
	// 		self = this;

	// 	if( slider.length >= 1 ){
	// 		slider.owlCarousel({
	// 			loop:false,
	// 			nav:true,
	// 			margin:0,
	// 			// autoHeight: true,
	// 			itemsScaleUp: true,
	// 			responsiveClass:true,
	// 			responsive:{
	// 				0:{
	// 					items:1,
	// 					nav:false,
	// 					dots:true
	// 				},
	// 				520:{
	// 					items:2,
	// 					nav:false,
	// 					dots:true
	// 				},
	// 				760:{
	// 					items:3,
	// 					nav:true,
	// 					dots:false
	// 				},
	// 				1281:{
	// 					items:5,
	// 					nav:true,
	// 					dots:false
	// 				}
	// 			}
	// 		});
	// 	}
	// },

	initResize: function (){
		self = this;
		// window.addEventListener("resize", function(e) {
		// 	// self.resizePortraitOverlayer();
		// 	// self.initHome();
		// 	// self.animationHero();
		// }, false);
	},

	animationHero: function (){
		this.resetFadehero( this.queryAll('.columns1 .fadecol') );
		this.resetFadehero( this.queryAll('.columns2 .fadecol') );
		this.resetFadehero( this.queryAll('.columns3 .fadecol') );

		this.bindFadehero( this.queryAll('.columns1 .fadecol'), 1100);
		this.bindFadehero( this.queryAll('.columns2 .fadecol'), 2200);
		this.bindFadehero( this.queryAll('.columns3 .fadecol'), 3300);
	},

	mediaQuery: function(w){
		if ( Modernizr.mq('only screen and (max-width: '+ w +')') ) {
			this.mqSize = true;
		} else {
			this.mqSize = false;
		}
	},

	handlePresetFilter: function(event){
		var target = event.delegateTarget,
			filter = target.getAttribute("data-filter");
		// console.log(this);
		app.view.filterSet = filter.split(', ');
		// console.log(window.app.view.filterSet);
	},



	handleHotspotClick: function (e){
		imagemap = $(this.el).find('.imagemap');
		hotspot = imagemap.find('.hotspot');
		hotspot.removeClass('active');
		$(e.target).addClass('active');
	},

	handleOpenGallerie: function (){
		$(this.el).find('.layer-description').removeClass('active');
		$(this.el).find('.layer-gallerie').addClass('active');
		return false;
	},

	handleCloseGallerie: function (){
		$(this.el).find('.layer-description').addClass('active');
		$(this.el).find('.layer-gallerie').removeClass('active');
		return false;
	},

	binddropdown: function (){
		item = $(this.el).find('.dropdown .item');
		item.find('.headline').on('click',function (){
			if( $(this).parent('.item').hasClass('active') ){
				item.removeClass('active');
			}else{
				item.removeClass('active');
				$(this).parent('.item').addClass('active');
			}
			
			return false;
		});
	},

	mobilesettings: function (){
	  if ( !this.isMobile ){
		$(this.el).find('.map_navigator').addClass('hide');
		$('#maplock').addClass('hide');
	  }
	},

	handleScrollForMore: function(){
		TweenMax.to(window, 1, {scrollTo:{y:600}, ease:Power2.easeOut});
	},

	handleScrolltoClick: function (e){
		scroll = $(e.target).attr('href');
		scrolltoY = $(scroll).offset().top;
		TweenMax.to(window, 1, {scrollTo:{y:scrolltoY}, ease:Power2.easeOut});
	},

	processAjaxData: function(response, urlPath){
		document.title = response.pageTitle;
		window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
	},

	handleScroll: function(value){

	}

});

module.exports = Content;