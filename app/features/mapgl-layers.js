// var mapboxgl = require('mapbox-gl');
var mapboxgl = require('../vendor/mapboxgl/mapbox-gl.js');
var each = require('amp-each');

var layers = {

	map:null,
	activeChapterName:null,
	i18n:null,

	// events: {
	// 	'click .taglist li a': 'toggleLayer'
	// },

	hideLayer: function(name){
		this.map.setLayoutProperty(name, 'visibility', 'none');
	},

	showLayer: function(name){
		this.map.setLayoutProperty(name, 'visibility', 'visible');
	},

	toggleLayer: function (e){
		e.preventDefault();
		e.stopPropagation();

		var taget = e.delegateTarget,
			id = $(taget).data('maplayer');

		if (id.length >= 1){
			var visibility = this.map.getLayoutProperty(id, 'visibility');
			if (visibility === 'visible') {
				this.map.setLayoutProperty(id, 'visibility', 'none');
			} else {
				this.map.setLayoutProperty(id, 'visibility', 'visible');
			}
		}
		return false;
	},

	// set flyto anchor
	handleMapboxAnchor: function (e){
		e.preventDefault();

		var target = e.delegateTarget,
			getid = target.getAttribute('href'),
			mappoint = getid.split('#').join(''),
			config = this.MapConfig.positions;

		if (mappoint === this.activeChapterName) return;

		this.map.flyTo(config[mappoint]);

	    document.getElementById(mappoint).setAttribute('class', 'active');
	    if(this.activeChapterName !== null){
	    	document.getElementById(this.activeChapterName).setAttribute('class', '');
	    }

	    this.activeChapterName = mappoint;
	},

	_switchCoordinates: function(item){
		switch(this.MapConfig.coordinates){
			case "mapbox":
				return [item.lat, item.lng];
			case "google":
				return [item.lng, item.lat];
		}
	},

	_i18n: function(){
		this.i18n = window.location.pathname.split('/')[1];
	},

	_renderMap: function(mapNode){
		if(this.MapConfig === undefined){
			console.log("Keine Config Datei angelegt");
			return;
		}

		var mToken = this.MapConfig.token,
			mName = this.MapConfig.name,
			mId = this.MapConfig.id,
			mStyle = this.MapConfig.style,
			mCoords = [this.MapConfig.view[1], this.MapConfig.view[0]],
			mZoom = this.MapConfig.zoom,
			mBearing = this.MapConfig.bearing,
			mPitch = this.MapConfig.pitch,
			self = this;

		if(mapNode !== null){
			mapboxgl.accessToken = mToken;
			var mapbox = new mapboxgl.Map({
				version: 8,
				name: mName,
				container: mId,
				style: mStyle,
				center: mCoords,
				zoom: mZoom,
				bearing: mBearing,
				pitch: mPitch,
				scrollZoom: false
			});

			// set initials
			this.map = mapbox;
			this._i18n();

			this.map.addControl( new mapboxgl.Navigation( {position:"top-right"} ) );
			this.map.on('style.load', function() {
				self._loadLayer();
			});

			this.popup = new mapboxgl.Popup();
			this.map.on('click', function (e) {
				self._clickPopup(e);
			});
			this.map.on('mousemove', function (e) {
				self._mouseMove(e);
			});
		}
	},

	_mouseMove: function(e){
		var self = this,
			keys = [];
		each(self.MapConfig.layer, function(layerData, key) {
			keys.push(key);
		});
		self.map.featuresAt(e.point, {
			radius: 30,
			layer: keys
		}, function (err, features) {
			self.map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
		});
	},

	_clickPopup: function (e){
		var self = this,
			keys = [];

			console.log("_clickPopup");

		each(self.MapConfig.layer, function(layerData, key) {
			console.log(key);
			keys.push(key);
		});

		self.map.featuresAt(e.point, {
			radius: 30,
			includeGeometry: true,
			layer: keys
		}, function (err, features) {
			if (err || !features.length) {
				self.popup.remove();
				return;
			}
			var feature = features[0];
			var prop = feature.properties;

			// popup template
			var output = '';
			output += '<div class="map-popup-layer">';
			output += prop.headline !== "" ? '<strong>' + prop.headline + '</strong>' : '';
			output += prop.description !== "" ? prop.description : '';
			output += '</div>';

			self.popup.setLngLat( feature.geometry.coordinates )
				.setHTML(output)
				.addTo(self.map);
		});
	},

	_loadLayer: function (){
		var self = this;

		each(self.MapConfig.layer, function(layerData, key) {
			self.map.addSource(key, {
				'type': 'geojson',
				'data': layerData.url
			});
			if(layerData.type == "point"){
				self.map.addLayer({
					"id": key,
					"interactive": true,
					"type": "symbol",
					"source": key,
					"layout": {
						"icon-image": "marker-{icon}",
						"text-field": "{title}",
						"text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
						"text-offset": [0, 1.6],
						"text-anchor": "top",
						"text-size": 14
					}
				});
			}
		});
	}
};

module.exports = layers;
