/*global $*/
// base view for pages
var Model = require('./base');
//var _ = require('underscore');
//var key = require('keymaster');


var Content = Model.extend({
    urlRoot: '/'
});

module.exports = Content;