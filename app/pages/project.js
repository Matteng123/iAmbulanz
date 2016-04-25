jQuery = $ = require('jquery');
var _ = require('underscore');
var PageView = require('./base');
var dom = require('ampersand-dom');
var gsap = require('../vendor/gsap/uncompressed/TweenMax.js');
var gsap = require('../vendor/gsap/uncompressed/plugins/ScrollToPlugin.js');
var owlCarousel = require('../vendor/owl.carousel.js');
var responsImg = require('../vendor/responsiveimage/jquery.responsImg.js');
var MapLayers = require('../features/mapgl-layers.js');

var Content = PageView.extend(MapLayers);
var Content = Content.extend({
	
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
		isScrollTop: [Boolean, true, false],
		webCam: '',
		'scrollPos': 0,
		'lnglatdom': [Boolean, true, false],
		'custommapdom': [Boolean, true, true],

		'filteritems': Object,
		'selectitems': Object,
		'cacheFilterArray': Array
	},

	filter: {
		cacheFilterArray: []
	},

	mapconfig: {
		name: "Mapbox Signa",
		token: 'pk.eyJ1IjoidGhlLWNhZG1hbiIsImEiOiJoNDFIM0M4In0.b67Xas5-DgBb2RxkSNzpBA',
		style: '/assets/maps/style/cillg5s550086c6m2va91udby.json',
		sprite: '/assets/maps/sprite',
		id: 'mapbox',
		view: [49.126658, 10.80350],
		zoom: 5,
		bearing: 0,
		pitch: 55,
		project: '',
		icons: {
			path: "/assets/images/maps/marker/",
			iconSize:     [23, 34], // size of the icon
			iconAnchor:   [12, 34], // point of the icon which will correspond to marker's location
			popupAnchor:  [0, -34], // point from which the popup should open relative to the iconAnchor
			shadowSize:   [0, 0], // size of the shadow
			shadowAnchor: [0, 0]  // the same for the shadow
		},
		layer:'',
		positions:''
	},
	
	events: {
		'click .taglist li a': 'toggleLayer',
		'click .immobilienliste a': 'handleMapboxAnchor',

		'click .img-overlayer': 'handlePortraitOverlayer',
		'click .portrait-details .icon-close': 'handlePortraitClose',
		'click .portrait-details .close': 'handlePortraitClose',
		'click .tabbar a': 'handleTabbarClick',

		'click .scrollto': 'scrollTo',
		
		// filterbox
		'click .btn-filterbox': 'openFilterMenu',
		'click .filter-select-box .close-btn': 'closeFilterMenu',
		'click .filter-select-box .selectitem a': 'getAllFilterItems',
		'click .filter-select-box .button-filter': 'setAllFilterItems',
		// selectbox projektstatus
		'click .filterselectbox-items .selectitem a': 'handleSelectbox',
		'click .filterselectbox .innerselection': 'handelOpenFilterSelectbox',
		'click .ovlgallerie': 'handleOverlayerGallerie',
		'click .owl-gallerie-overlayer .close': 'handleOverlayerGallerieClose',
		'mouseover .filterselectbox .filterselectbox-items': 'handelOpenFilterSelectbox',
		'mouseout .filterselectbox': 'handelCloseFilterSelectbox'
	},

	hookBeforeHide: function(){
		if(this.webCam != ''){
			clearInterval(this.webCam);
		}
	},

	hookInRender: function () {
		var self = this;

		// array for input fileds in wohnungsfinder
		self.cacheFilters = [];

		this.container = $(this.el);
		this.allfilteritems = this.queryAll('.filterlist .filteritem');
		this.selectboxitems = this.queryAll('.filterselectbox-items .selectitem');

		this.cacheElements({
			mapbox: '#mapbox',
			filterselectbox: '.filterselectbox'
		});

		TweenMax.delayedCall(0.1, this.initSlider, [], this); // Slider
		TweenMax.delayedCall(0.2, this.bindResponsimg, [], this); // Responsive Images
	

		if ($(this.mapbox).length >= 1){
			// mapbox-gl
			if (this.lnglatdom){
				var lnglat = $(this.mapbox).data('lnglat');
				if (lnglat.length >= 1){
					lnglatArr = lnglat.split(' ').join('').split(',');
					this.mapconfig.view = [lnglatArr[0], lnglatArr[1]];
				}
			}

			// include map models
			this.mapconfig.layer = this.model.layer;
			this.mapconfig.positions = this.model.positions;
			// init/render map
			TweenMax.delayedCall(0.1, this._renderMap, [this.query('#mapbox')], this);
		}

		this.initActiveTap();
	},

	hookAfterRender: function(){
		this.scrollTo();
	},

	initHome: function (){
		var hcm = $(this.el).find('.home-copy-middle');
		var read = $(this.el).find('.home-copy-read');
		hcm.css({'height': read.height() });
	},

	scrollTo: function(){
		// console.log("scrollTo: " + window.location.hash);
		if (app.pageHash != undefined ){
			var id = this.query(app.pageHash);
			TweenMax.to(window, 1.2, {scrollTo:{y:id.offsetTop}, ease:Power2.easeOut});
		}
	},

	bindResponsimg: function (){
		var img = $(this.el).find('.responsimg');
		img.responsImg({
			allowDownsize: true
		});
	},

	initResize: function (){
		self = this;
		window.addEventListener("resize", function(e) {
			// self.initHome();
		}, false);
	},

	/// tabbar START
	handleTabbarClick: function (e){
		e.preventDefault();
		this.handleSubTabbarClick( e.delegateTarget );
	},

	handleSubTabbarClick: function (node){
		var target = $( node ),
			id = target.attr('href');
			
		$(this.el).find('.tabbar a').removeClass('active');
		target.addClass('active');

		$(this.el).find('.tabcontent .tabitem').removeClass('active');
		$(this.el).find('.tabcontent '+id).addClass('active');
	},
	initActiveTap: function (){
		if ($(this.el).find('.tabbar').length >= 1 ){
			this.handleSubTabbarClick( $(this.el).find('.tabbar a')[0] );
		}
	},
	/// tabbar ENDE

	/// Portrait START
	handlePortraitOverlayer: function (e){
		e.preventDefault();
		var target = $(e.delegateTarget),
			portraitLayer = $(this.el).find('.portrait-layer'),
			top = target.parent('.columns').offset().top;

		this.scrollPos = this.getScrollXY()[1];

		// reset elements
		portraitLayer.find('.img-overlayer').removeClass('active');
		portraitLayer.find('.portrait-details').removeClass('active');
		
		portraitLayer.find('.columns').removeClass('active').removeClass('hover');

		$(this.el).find('.portrait-layer').removeClass('active');
		// active element
		target.parent('div').addClass('hover');
		target.addClass('active');
		target.parent('div').find('.portrait-details').addClass('active');
		target.parents('.portrait-layer').addClass('active');
		_.each(target.parents('.portrait-layer').find('.columns'), function(index, val) {
			if ( $(index).offset().top <= top && !$(index).hasClass('hover') ){
				$(index).addClass('active');
			}
		});
		// target.parent('div').find('.portrait-details')
	},
	handlePortraitClose: function (e){
		e.preventDefault();

		portraitLayer = $(this.el).find('.portrait-layer'),
		// reset elements
		portraitLayer.find('.img-overlayer').removeClass('active');
		portraitLayer.find('.portrait-details').removeClass('active');
		
		portraitLayer.find('.columns').removeClass('active').removeClass('hover');
		portraitLayer.removeClass('active');

		TweenMax.to(window, 1, {scrollTo:{y:this.scrollPos}});

	},

	resizePortraitOverlayer: function (){
		if ($(this.el).find('.portrait-layer.active .columns').length >= 1){
			var portraitLayer = $(this.el).find('.portrait-layer.active .columns'),
				top = $(this.el).find('.portrait-layer.active .columns.hover').offset().top;

			// add or reset layer
			_.each(portraitLayer, function(index, val) {
				if ( $(index).offset().top <= top && !$(index).hasClass('hover') ){
					$(index).addClass('active');
				}else{
					$(index).removeClass('active');
				}
			});
		}
	},
	/// Portrait ENDE

	// GALLERIE START
	handleOverlayerGallerie: function(el){
		// console.log("klick handleOverlayerGallerie");
        var self = this,
        	$target = $(el.delegateTarget),
        	$gallerieArray = $target.data('gallerie').split(','),
        	$galleriePath = $target.data('path'),

            $overlayer = $(this.el).find('.owl-gallerie-overlayer'),
            $view = $overlayer.find('.view');


         if ($overlayer.hasClass('active')){
         	$overlayer.removeClass('active');
         	$view.empty();
         	return ;
         }else{
			if( $view.length >= 1 ){
				$overlayer.addClass('active');
				if ($gallerieArray.length > 1){
					$.each($gallerieArray, function (i,e){
						$view.append('<img class="owl-lazy" data-src="'+$galleriePath + e +'">')
					})
					console.log("start LazyLoad");

					$view.owlCarousel( self.slider.galerie );
				}else{
					$(this.el).find('#gallerieslider').addClass('owl-carousel view owl-theme owl-loaded');
					$view.append('<img class="owl-lazy" src="'+$galleriePath + $gallerieArray[0] +'">')
				}
				// $view.loaded.owl.lazy
				// setTimeout(function (){
				// 	$view.trigger('resized.owl.carousel');
				// },500);
			}
		}
	},
	handleOverlayerGallerieClose: function(el){
		var self = this,
			$target = $(el.delegateTarget),
			$overlayer = $(this.el).find('.owl-gallerie-overlayer'),
			$view = $overlayer.find('.view');

		if ($overlayer.hasClass('active')){
			$overlayer.removeClass('active');
			$view.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			$view.find('.owl-stage-outer').children().unwrap();
			$view.empty();
			return ;
		}
	},
	// GALERIE END 

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

	// handleTabbarClick: function (e){
	// 	this.handleSubTabbarClick(e.target);
	// },
		
	// handleSubTabbarClick: function(target){
	// 	anchor = $(target).attr('href');
	// 	group =  $(target).data('group');

	// 	scroll = $(target).data('scroll');
	// 	if (scroll != undefined){
	// 		// console.log("scroll: ", scroll);
	// 		scrolltoY = $(scroll).offset().top;
	// 		TweenMax.to(window, 1, {scrollTo:{y:scrolltoY}, ease:Power2.easeOut});
	// 	}

	// 	tablist = $(this.el).find('.tablist');
	// 	tablist.find('a').each(function (){
	// 		if($(this).data('group') == group){
	// 			$(this).removeClass('active');
	// 		}
	// 	});
		
	// 	$(target).addClass('active');
	// 	tabcollection = $(this.el).find('.tabcollection');
	// 	tabcollection.find('.'+group).removeClass('active');
	// 	// tabcollection.find('.tabcontent').removeClass('active');
	// 	tabcollection.find(anchor).addClass('active');
	// },

	// initActiveTap: function(){
	// 	hash = window.location.hash;
	// 	if ( hash.length >= 1){
	// 		hashname = hash.split('#').join('');
	// 		this.handleSubTabbarClick( $(this.el).find('.'+hashname)[0] );
	// 		return false;
	// 	}
	// },

	processAjaxData: function(response, urlPath){
		document.title = response.pageTitle;
		window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
	},

	handleScroll: function(value){

	},

	openFilterMenu: function(){
		var filterbox = this.query('.filter-select-box');
        dom.addClass(filterbox, "open");
        filterbox.style.zIndex = '9999';
    },

    closeFilterMenu: function(){
    	var filterbox = this.query('.filter-select-box');
        dom.removeClass(filterbox, "open");
        setTimeout(function(){
        	filterbox.style.zIndex = '0';
        }, 600);
    },

    getAllFilterItems: function(e){
    	var self = this,
    		target = e.delegateTarget,
    		getKey = target.getAttribute('data-key'),
    		getValue = target.getAttribute('data-value'),
    		newFilter = { 	
				key: getKey,
				value: [getValue],
				type: 'new'
    		};

    	if(self.filter.cacheFilterArray.length > 0) {
    		_.each(self.filter.cacheFilterArray, function(filter, index){
    			if(filter.key == newFilter.key){
    				// filter each data-value in values
    				_.each(filter.value, function(values, index){
    					if(values == newFilter.value){
    						filter.value = _.without(filter.value, values);
    						newFilter.type = 'delete';
    					}
    				});

    				// check if values exists then delete 
    				// otherwise push or add new one
    				if(newFilter.type == 'delete'){
						if(filter.value.length == 0){
							self.filter.cacheFilterArray = _.without(self.filter.cacheFilterArray, filter);
						}
					} else {
						switch(newFilter.key) {
						    case 'place':
						        filter.value = JSON.parse('["' + newFilter.value[0] + '"]');
						        newFilter.type = 'replace';
						        break;
							default:
								filter.value.push(newFilter.value[0]);
						        newFilter.type = 'add';
								break;
						}
					}
    			}
    		});
    	}

    	// add newfilter
		if(newFilter.type == "new"){
			self.filter.cacheFilterArray.push(newFilter);
		}
		// console.log(self.filter.cacheFilterArray);

    	// toggle class
    	this.toggleInputClass(target);
    },

    toggleInputClass: function(item){
    	var self = this;

    	if(item.parentNode.parentNode.getAttribute('class').indexOf('filterselectbox') > -1){
    		_.each(self.selectboxitems, function(elements, index){
    			dom.removeClass(elements.childNodes[0], 'active');
    		});
    		dom.addClass(item, 'active');
    	} else {
	    	if(!dom.hasClass(item, 'active')) { 
	    		dom.addClass(item, 'active'); 
	    	}
			else { 
				dom.removeClass(item, 'active'); 
			}
    	}
    },

    setAllFilterItems: function(){
    	var self = this,
    		cache = self.filter.cacheFilterArray,
    		filteritems = self.queryAll('.filterlist .filteritem');

    	_.each(filteritems, function(elements, index){
    		dom.addClass(elements, 'unselect');
    		dom.removeClass(elements, 'select');
    	});

    	var match = _.filter(filteritems, function(items, index, list){ 
    			var isval = 0;
				var itemVal = JSON.parse(items.getAttribute('data-selection'));

				_.each(cache, function(filter, index) {	
					for(var key in itemVal){
						if(filter.key == key){
							// console.log(typeof filter.value);
							// console.log(self.filter.cacheFilterArray);

							// console.log("filter.value:", filter.value);
							// console.log("itemVal:", itemVal[filter.key]);
							// console.log("intersection:", _.intersection(filter.value, itemVal[filter.key]) )
							
							if(_.intersection(filter.value, itemVal[filter.key]).length > 0) {
								isval++;
							}
						}
					}
				});
				
				if(isval === cache.length) {
					return true;
				}

				return false;
			});

    	// console.log(match);
    	_.each(match, function(mItems, index){
			dom.addClass(mItems, 'select');
			dom.removeClass(mItems, 'unselect');
    	});

    	this.closeFilterMenu();
    },

   //  setAllFilterItems: function(){
   //  	var self = this,
   //  		cache = self.filter.cacheFilterArray;

   //  	_.each(self.allfilteritems, function(elements, index){
   //  		dom.addClass(elements, 'unselect');
   //  		dom.removeClass(elements, 'select');
   //  	});

   //  	var match = _.filter(self.allfilteritems, function(items, index, list){ 
   //  			var isval = 0;
			// 	var itemVal = items.getAttribute('data-selection');

			// 	_.each(cache, function(filter, index) {
			// 		// console.log("########");
			// 		if(typeof filter.value == "object"){
			// 			_.each(filter.value, function(dvalues, index){
			// 				// console.log("filter.value:", dvalues);
			// 				// console.log("indexOf:", itemVal.indexOf(dvalues));
			// 				// console.log("isval:", isval);
			// 				if(itemVal.indexOf(dvalues) != -1 ){
			// 					isval++;
			// 				}
			// 			});
			// 		} else {
			// 			if(itemVal.indexOf(filter.value) != -1 ){
			// 				isval++;
			// 			}
			// 		}
			// 	});
				
			// 	if(isval === cache.length) {
			// 		return true;
			// 	}

			// 	return false;
			// });

   //  	// console.log(match);
   //  	_.each(match, function(elements, index){
   //  		dom.addClass(elements, 'select');
   //  		dom.removeClass(elements, 'unselect');
   //  	});

   //  	this.closeFilterMenu();
   //  },

	handleSelectbox: function(e){
		var self = this,
			tag = e.delegateTarget,
			output = this.query('.updatefield');

		dom.removeClass(this.filterselectbox, 'open');
        output.innerHTML = e.delegateTarget.innerHTML;
	},

	handelOpenFilterSelectbox: function(e){
		dom.addClass(this.filterselectbox, 'open');
	},
	handelCloseFilterSelectbox: function(e){
		console.log("handelCloseFilterSelectbox");
		dom.removeClass(this.filterselectbox, 'open');
	}

});

module.exports = Content;