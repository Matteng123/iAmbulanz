jQuery = $ = require('jquery');
var _ = require('underscore');
var PageView = require('./base');
var dom = require('ampersand-dom');
var gsap = require('../vendor/gsap/uncompressed/TweenMax.js');


var Wohnen = PageView.extend({
	
	props:{
		isinitial: false,
		container: Object,
		baseUrl: [String, true, window.location.origin],
		mqSize: [Boolean, true, false],
		
		cacheSpot:Object,
		cacheRow:Object,
		cacheSvgGOpacity:Object,
		cacheWohnFinderList:Object,
		cacheFilterByClick:Object,
		cacheFilters:Array,
		cacheClickWohnfinderInfo:0,
		cacheSVG: Object,

		isScrollTop: [Boolean, true, false]
	},
	
	events: {
		'click .hotspot': 'handleHotspotClick',
		'click .favorite': 'handleFavorite',
		
		// Wohnfinder Events
		'click #g-quattrohaus': 'handleWohnfinderInfo',
		'click #g-hofhaus': 'handleWohnfinderInfo',
		'click #g-reihenhaus': 'handleWohnfinderInfo',
		'click #g-punkthaus': 'handleWohnfinderInfo',
		'click .wohnungsfinder-liste .table-elm_ansicht a': 'pointOfViewWohnfinder',
		'click .filter-wrapper .checkboxselection': 'wohnFilter',
		'click #clear_wohnfilter': 'clearWohnFilter',
		'mouseover #hover-effects g[id*="g-"]': 'hoverWohnfinderInfo',
		'mouseout #hover-effects g[id*="g-"]': 'hoverWohnfinderInfo',
		'click .filter-button': 'mobileFilterButton',
		'click .filter-wrapper .close': 'mobileFilterButton'
	},

	hookBeforeHide: function(){
	},

	hookInRender: function () {

		var self = this;
		this.cacheElements({ });

		// array for input fileds in wohnungsfinder
		self.cacheFilters = [];

		this.container = $(this.el);

		this.bindWohungsfinder();

		setTimeout(function (){
			self.cacheWohnFinderList = self.query('.wohnungsfinder-liste');

			var wfList = document.getElementById('wohnungsfinder_list');
			
		},800);

		var svgWohnFinder = this.query('.wohnungsfilter-svg');
		
		if(svgWohnFinder != undefined){
			this.cacheSVG = svgWohnFinder;
			this.setWohnfinderDefaults();
			//console.log(this.cacheSVG.children);
		}

	},

	hookAfterRender: function(){
		var self = this,
			cover = this.query('.cover');
		
		if(app.view.filterSet != ''){
			_.each(app.view.filterSet, function(values){
				self.query('#'+values).click();
				setTimeout(function (){
					TweenMax.to(window, 1, {scrollTo:{y:cover.offsetHeight-120}, ease:Power2.easeInOut});
				}, 50);
			});

			app.view.filterSet = '';
		}
	},

	handleFavorite: function (e){
		row = $(e.target);//.parent().parent('tr');
		if ( row.hasClass('active') ){
			row.removeClass('active');
			row.parent().parent('tr').removeClass('favorite');
			row.parent().attr('data-value', '');
		}else{
			row.addClass('active');
			row.parent().parent('tr').addClass('favorite');
			row.parent().attr('data-value', 'active');
		}
		var cookie = '',
			splite = '';
		active = $(this.el).find('.table-elm_favoriten a.active');
		$.each(active , function (e){
			row = $(this).data('row');
			cookie =  row + splite + cookie;
			splite = ',';
		});
		
		// console.log("cookie:",cookie);
		// $.get('/ajaximport/importer.php',{'f':'cookie','c':cookie},function (data){
		// 	console.log(data);
		// },'html');
	},

	handleHotspotClick: function (e){
		imagemap = $(this.el).find('.imagemap');
		hotspot = imagemap.find('.hotspot');
		hotspot.removeClass('active');
		$(e.target).addClass('active');
	},

	bindWohungsfinder: function (){
		var wf = $(this.el).find('.wohungsfinderload');
		if( wf.length >= 1 ){
			$.get( '/ajaximport/importer.php',{'f':'read'}, function (data){
				wf.append( data );
			}, 'html');
		}
	},

	mobileFilterButton: function(e){
		var body = document.querySelector('body');
		
		if(!dom.hasClass(body, 'open-layer')){
			dom.addClass(body, 'open-layer');
		} else {
			dom.removeClass(body, 'open-layer');
		}
	},

	setRowLength: function(v1,v2){
		var output = $('.rows-value');
		
		if(v1 != null){
			output.html('Einträge: ' + v1 + ' von ' + v2);
		} else {
			output.html('');
		}
	},

	clearWohnFilter: function(e){
		self.cacheFilters = [];
		var $table = $('.wohnungsfinder-liste'),
			$tableRows = $table.find('tbody tr');

		this.toggleWohnFilterClass($('label'));

		$tableRows.show();
		$table.trigger("update");
		$table.trigger("appendCache");

	},

	toggleWohnFilterClass: function(el, valid){
		var label = $(el),
			queries = $(el).parents('.group').find('label');

		// queries.removeClass('active');
		// if(valid) label.addClass('active');
		if(!label.hasClass('active')){
			label.addClass('active');
		} else {
			label.removeClass('active');
		}
	},

	wohnFilter: function(e){
		var self = this,
			tag = e.delegateTarget,
			changeInGroup = 'add', // replace
			$input = $(tag).find('input'),
			$filter = $('select.tablefilter'),
			$table = $('.wohnungsfinder-liste'),
			newFilter = {	key:$input.attr('data-key'), 
							value:[$input.attr('data-value').split(' ').shift()],
							type:'new'
						},
			rowsInfo = {num:null, sum:$table.find('tbody tr').length},
			dataVal = null,
			dataName = null,
			match = 0;

		/* 
			filtersCache = [{key:rooms, value:[2, 3]},{key:space, value:[20-50]}];
		*/

		// remove all actives in group
		self.toggleWohnFilterClass(tag); 

		// bestehender filter ist nicht leer = prüfen ob delete oder replace/add oder new
		if(self.cacheFilters.length > 0){
			_.each(self.cacheFilters, function(filter, index){

				if(filter.key === newFilter.key){
					_.each(filter.value, function(dvalue, index){
						// klick auf den gleichen wert = deaktivieren
						if(dvalue == newFilter.value) {
							filter.value = _.without(filter.value, dvalue);
							newFilter.type = 'delete'
						}
					});

					if(newFilter.type == 'delete'){
						// console.log(filter.value.length);
						if(filter.value.length == 0){
							self.cacheFilters = _.without(self.cacheFilters, filter);
						}
					}
					else{
						if(changeInGroup == 'add'){
							filter.value.push(newFilter.value[0]);
							newFilter.type = 'add';
						}else if(changeInGroup == 'replace'){
							filter.value = newFilter.value;
							newFilter.type = 'replace';
						}
					}
				}
			});
		}

		if(newFilter.type == "delete"){
			// filter clearen
			//self.toggleWohnFilterClass(tag);
		}
		else if(newFilter.type == "new"){
			// filter ergänzen
			self.cacheFilters.push(newFilter);
		}

		// hide table
		$table.find('tbody tr').hide();

		// filter table
		var $tableRows = $table.find('tbody tr').filter(function(){

			match = 0;

			$(this).find('td').each(function(){
				var cell = $(this),
					cellData = {key:cell.attr('data-key'), value:cell.attr('data-value')};

				_.each(self.cacheFilters, function(filter, filters) {
					if(cellData.key === filter.key){
						_.each(filter.value, function(dvlaue, index){

							// von bis
							if(dvlaue.indexOf('-') != -1){
								
								var $vals = dvlaue.split("-"),
									$val = parseInt(cellData.value);

								if(! $vals[1] && $val >= $vals[0] || $val >= $vals[0] && $val < $vals[1]) {
									match++;
								}
							}
							// gleich
							else {
								if(dvlaue === cellData.value){
									// match == true
									match++;
								}
							}


						});
						
					}
				})
			});
			
			if(match === self.cacheFilters.length) {
				return true;
			}

			return false;
		});

		$tableRows.show();
		$table.trigger("update");
		$table.trigger("appendCache");

		// rows info div
		rowsInfo.num = $tableRows.length < rowsInfo.sum
						? $tableRows.length
						: null;
		this.setRowLength(rowsInfo.num, rowsInfo.sum);

	},

	pointOfViewWohnfinder: function(e){
		var self = this,
			aTag = e.delegateTarget,
			getId = aTag.parentNode.parentNode.firstChild,
			getRow = aTag.parentNode.parentNode,
			reExp = new RegExp("\\.","g"),
			spot = '#s-'+ getId.dataset.value.replace(reExp, ''),
			querySpot = self.query(spot);

		// scroll top
		gsap.to(window, 1, {scrollTo:{y:0}, ease:Power2.easeOut});

		// make events
		if(this.cacheRow != undefined && this.cacheSpot != undefined){
			dom.removeClass(this.cacheRow, 'active-row');
			TweenLite.to( self.cacheSpot, 0.5, {opacity:0} );
		}

		dom.addClass(getRow, 'active-row');
		TweenLite.to( spot, 0.5, {opacity:0.55} );
  
		// cache elements
		this.cacheSpot = spot;
		this.cacheRow = getRow;
		
	},

	hoverWohnfinderInfo: function(e){

		var self = this,
			$svg = $(this.cacheSVG),
			el = e.delegateTarget.getAttribute('id'),
			cache = self.cacheSVG,
			op = $svg.find('#op-'+ el.split('-').pop()),
			ifClick = this.cacheClickWohnfinderInfo || undefined;

		$svg.find('#g-opacity').children().each(function(){
			$(this).css('display', 'none');
			op.removeClass('active');
		});

		if(e.type === 'mouseover' || this.cacheClickWohnfinderInfo != undefined) {
			op.css('display', 'block');
			op.addClass('active');
		}
		
	},

	handleWohnfinderInfo: function(e){
		var self = this,
			aTag = e.delegateTarget,
			type = aTag.id.split('-').pop(),
			
			$svg = $(this.cacheSVG),
			$svgGHoverEffects = $svg.find('#g-'+type),
			$svgGOpacity = $svg.find('#op-'+type),
			$svgGInfo = $svg.find('#info-'+type);

		// console.log(self.cacheClickWohnfinderInfo);

		self.setWohnfinderDefaults();

		if(this.cacheClickWohnfinderInfo == undefined || this.cacheClickWohnfinderInfo != type) {
			// show infobox
			console.log('#info-'+type);
			TweenLite.to( '#info-'+type, 1, {css:{opacity:1}, overwrite:true} );
			
			$svgGHoverEffects.css('z-index', '99');	//svgGHoverEffects.style.zIndex = 99;
			$svgGHoverEffects.attr('class', 'active'); //dom.addClass(svgGHoverEffects, 'active');

			if($(this.cacheSvgGOpacity) != undefined) {
				$(this.cacheSvgGOpacity).css('display', 'none');
			}
			
			$svgGOpacity.css('display', 'block');

			this.cacheSvgGOpacity = $svgGOpacity;
			this.cacheClickWohnfinderInfo = type;
		} else {
			this.cacheClickWohnfinderInfo = null;
		}

	},

	setWohnfinderDefaults: function(){
		// console.log("setWohnfinderDefaults");
		var self = this,
			infobox = id = '',
			$svg = $(this.cacheSVG),
			$svgElements = $svg.children(),
			$gHoverEffects = $svg.children('#hover-effects').children();

		$gHoverEffects.each(function(index,el){
			
			infobox = $(this).children()[2];
			id = $(infobox).attr('id');
			// console.log('#'+id);
			TweenMax.set('#'+id, {css:{opacity:0}});
			$gHoverEffects.css('z-index', '0');  // self.cacheSVG.children['hover-effects'].children[i].style.zIndex = 0;
			$(this).attr('class', ''); // dom.removeClass(e, 'active');
		});
		
	},

	kill: function () {
		this.isKilled = true;
	}

	// _getDomChildren: function(element){
	// 	if(element.children != undefined){
	// 		return element.children;
	// 	} else {
	// 		var children = {};
	// 		if(element.childNodes){
	// 			_.each(element.childNodes, function(node, index, childNodes){
	// 				children[node.getAttribute("id")] = node;
	// 			});
	// 			return children;
	// 			console.log(element);
	// 		}
	// 	}
	// }

});

module.exports = Wohnen;