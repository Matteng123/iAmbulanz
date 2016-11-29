// base view for pages
import Model from 'ampersand-model';

let Content = Model.extend({
		urlRoot: '/',
		props: {
				source: 'String',
				name: 'String',
				token: 'String',
				style: 'String',
				id: 'String',
				view: ['Array', function(){ return {} }, true],
				zoom: 'Number',
				bearing: 'Number',
				pitch: 'Number',
				icons: ['Object', function(){ return [] }, true],
				layer: ['Object', function(){ return [] }, true]
		},
		url: function () {
				var url = this.source;
				return url;
		},
		ajaxConfig: function () {
				return {
						xhrFields: {
								'withCredentials': true
						},
						headers: {
								'accept': 'application/json'
						}
				};
		}
});

export default Content;
