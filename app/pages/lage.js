jQuery = $ = require('jquery');
var _ = require('underscore');
var PageView = require('./base');
var dom = require('ampersand-dom');
var owlCarousel = require('../vendor/owl.carousel.js');
var owlCarousel = require('../vendor/owl.carousel2.thumbs.js');
var gsap = require('../vendor/gsap/uncompressed/TweenMax.js');


var Lage = PageView.extend({
	
	props: {
		isinitial: false,
		container: Object,
		baseUrl: [String, true, window.location.origin],
		mqSize: [Boolean, true, false],
		jsonCache: Array,
		mapSettings: Object,
		geoJson: '',
		myLayer: '',
		map: Object,
		coordinates: Object,
		pinsIcon: '',
		
		zoomAnchor: [String, true, ''],
		setLogoHref: [Boolean, true, false]
	},

	events: {
		'click .togglemenu': 'handleTogglemenu'
	},
	
	mapconfig: {
		basic: {
			view: [51.220749,6.807531],
			zoom: 16,
			showspots: [],
			pinurl: [
				'/assets/maps/export/basic.geojson'
			],
			polygonurl: [],
			imageurl: []
		}
	},

	hookBeforeHide: function(){
	},

	hookInRender: function () {
		var self = this;

		this.container = $(this.el);
		
		this.cacheElements({
			mapbox: '#mapbox'
		});

		TweenMax.delayedCall(0.1, this.initSlider, [], this); // Slider
		TweenMax.delayedCall(1.2, this.bindResponsimg, [], this); // Responsive Images
		
		setTimeout(function(){
			self.getMap();
		}, 50);
		
	},

	bindResponsimg: function (){
		var img = $(this.el).find('.responsimg');
		img.responsImg({
			allowDownsize: true
		});
	},
	
	hookAfterRender: function(){
	},

	processAjaxData: function(response, urlPath){
		document.title = response.pageTitle;
		window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
	},

	handleScroll: function(value){
	},

	kill: function () {
		this.isKilled = true;
	},

	handleTogglemenu: function(e){
		window.app.view.handleTogglemenu(e);
	},

	initSlider: function(el){
		var slider = $('.owl-carousel, .owl-details'),
			self = this;

		if( slider.length >= 1 ){
			slider.owlCarousel({
				loop:false,
				nav:true,
				margin:0,
				items:1,
				thumbs: true,
				// autoHeight: true,
				itemsScaleUp: true,
				thumbsPrerendered: true,
				thumbContainerClass: 'owl-carousel-thumb',
				thumbItemClass: 'thumb-item'
			});
		}
	},

	_handlePinsOnMap: function(){
		var pin = '.leaflet-marker-icon';

		setTimeout(function(){
			$('.leaflet-marker-icon').on( "click", function() {
				$(this).toggleClass('active').siblings().removeClass('active');
			});
		}, 200);
	},

	getMap: function(){
		var map = this.mapbox || null,
			self = this;

		this.mapSettings = {
			token: 'pk.eyJ1IjoibWFwYm94LWZsaW5jYXJyZSIsImEiOiJjaWdtOG9hZmcwMTh1dDdtM3h3ZmNpcjFpIn0.S1IYZizUTihJ1PJjmDZxow',
			id: 'mapbox-flincarre.o36fdeai'
		};
		
		this.doMap();
		this.map.on('ready', function() {
			self.getAllGeoJson();
			self._handlePinsOnMap();
		});
	},
	
	getAllGeoJson: function (){
		var self = this,
			num = 0,
			pin = 0,
			arr = [];

		_.each(self.mapconfig, function( value, key ) {
			if(value.pinurl.length > 0){
				_.each(value.pinurl, function( val, i ) {
					$.getJSON(val, function(data) {
						num++;
						pin = 'pin_'+num;

						self.geoJson = data;
						self._setPins(pin, self.geoJson);
					});
				});
			}
		});
	},

	_setImage: function (json){
		var self = this,
			geoJson = json.features;
			
		var getImage = L.geoJson(json, {
			onEachFeature: function (feature, layer) {
				mCoords = [
					[feature.geometry.coordinates[0][0][1], feature.geometry.coordinates[0][0][0]],
					[feature.geometry.coordinates[0][1][1], feature.geometry.coordinates[0][1][0]]
					];
				imageBounds = L.latLngBounds(mCoords);
				if (feature.properties.url == 'intern'){
					url = './assets/maps/source/'+feature.properties.image;
				}else{
					url = feature.properties.image;
				}
				// console.log( url, feature.geometry.coordinates );
				L.imageOverlay(url, imageBounds).addTo(self.map);

			},
			style: function(feature) { return feature.properties; }
		}).addTo(self.map);
	},

	_setPins: function(layer, json){
		var self = this,
			geoJson = json.features;

		layer = L.geoJson(null, {
			pointToLayer: function(feature, ll) {
				return L.marker(ll, {
					icon: L.divIcon({
						className: feature.properties.icon,
						html: '<span>'+feature.properties.title+'</span><i></i>',
						iconSize: [100, 40]
					})
				});
			}
		}).addTo(this.map);

		L.mapbox.featureLayer('mapbox.dc-markers')
			.on('ready', function(e) {
				layer.addData(geoJson);
			});
	},

	doMap: function(){
		var mToken = this.mapSettings.token,
			mId = this.mapSettings.id,
			mCoords = [this.mapconfig.basic.view[0], this.mapconfig.basic.view[1]];
			mZoom = this.mapconfig.basic.zoom;

		this.map = this.query('#mapbox');

		L.mapbox.accessToken = mToken;
		this.map = L.mapbox.map(this.map, mId).setView(mCoords, mZoom);
		this.map.scrollWheelZoom.disable();
	}

});

module.exports = Lage;