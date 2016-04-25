// base view for pages
var Model = require('ampersand-model');

var Content = Model.extend({
    urlRoot: '/',
    props: {
        id: ['string', false, ''],
        json: ''
    },
    parse:function (resp, options) {
        this.json = resp;
        
        return resp;
    },
    url: function () {
        var url = this.urlRoot + this.id;
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