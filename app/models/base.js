/*global $*/
// base view for pages
var $ = require('jquery');
var Model = require('ampersand-model');
var _ = require('underscore');
//var key = require('keymaster');


var Content = Model.extend({
    urlRoot: '/',
    props: {
        id: 'string',
        pageContent: 'object',
        pageTitle: 'string',
        pageTopMenu: 'string',
        pageBottomMenu: 'string',
        i18nSwitcher: 'object',
        lang: 'string'
    },
    parse:function (resp, options) {
        var dom = $(resp);
        this.pageTitle = resp.split("<title>")[1].split("</title>")[0];
        this.pageContent = dom.find('.Application-view')[0];
        return resp;
    },

    ajaxConfig: function () {
        return {
            xhrFields: {
                'withCredentials': true
            },
            headers: {
                'accept': 'application/html'
            }

        };
    },
    url: function () {
        var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
        var url;
        if (this.isNew()) url = base;
        else url = base + (base.charAt(base.length - 1) === '/' ? '' : '/') + this.getId() ;
        return url + location.search;
    }
});


module.exports = Content;
