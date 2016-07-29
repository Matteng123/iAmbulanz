/*global $*/
// base view for pages
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = $; window.jQuery = jQuery;

import Model from 'ampersand-model';
import _ from 'underscore';

let Content = Model.extend({
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
    parse: function (resp, options) {
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


export default Content;
