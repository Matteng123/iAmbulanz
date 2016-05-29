// base view for pages
var Model = require('ampersand-model');

var Content = Model.extend({
    urlRoot: '/',
    props: {
        source: 'String',
        name: 'String',
        token: 'String',
        style: 'String',
        id: 'String',
        view: Array,
        zoom: Number,
        bearing: Number,
        pitch: Number,
        icons: Object,
        layer: Object
    },
    url: function () {
        var url = this.urlRoot + this.source;
        return url;
    },
    ajaxConfig: function () {
        return {
            xhrFields: {
                'withCredentials': true
            }
        };
    }
});

module.exports = Content;
