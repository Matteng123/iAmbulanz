import $ from 'jquery';
import jQuery from 'jquery';
window.$ = $; window.jQuery = jQuery;

import _ from 'underscore';
import dom from 'ampersand-dom';

import PageView from './base';
import MapModel from '../models/mapbox';
import "TweenMax";
import "responsImg"
import owlCarousel from '../vendor/owl.carousel.js';
import MapLayers from '../features/mapgl-layers.js';
import Form from '../features/form.js';


let Content = PageView.extend(MapLayers);
    Content = Content.extend(Form);

Content = Content.extend({

  events: {
    "click .Location-teaser-tab-item":"_handleTabbarClick",
    "click .Prices-button":"_handlePricebarClick",
    "click .Form-field--radio div":"_handleRadioClick",
    "click .Form-field--checkbox div":"_handleCheckboxClick",
    "click .Form-element button[type=submit]":"_handleFormSubmitClick"
  },

  hookBeforeHide: function(){

  },

  hookInRender: function () {
    var self = this;

    TweenMax.delayedCall(0.1, this.initializeSlider, [], this); // Slider
    // this.bindResponsimg();
    this.Tabbars = this.queryAll('.Location-teaser-tab-item');
    this.Pricebars = this.queryAll('.Prices-button');
    this.Pricetables = this.queryAll('.Prices-table');
    this.Mapbox = this.query('.Map-body');

    if (this.Mapbox !== undefined){
        this.MapConfig = new MapModel({source:'./assets/map/config.json'});
        this.MapConfig.on("sync", function(model, resp){
              console.log("sync mapmodel");
            self._renderMap(this.Mapbox);
        });
        this.MapConfig.fetch();
    }

  },

  initializeSlider: function(){
    let isloop = (this.queryAll('.Carousel .Carousel-body .item').length > 1) ? true : false;

    $('.Carousel .Carousel-body').owlCarousel({
          loop:isloop,
          margin:0,
          nav:true,
          items:1
    });

    $('.Carousel--testimonials .Carousel-body').owlCarousel({
          loop:true,
          margin:0,
          nav:true,
          items:1
    });

    $('.Devices-carousel .Devices-carousel-wrapper').owlCarousel({
          nav: true,
          items: 4,
          responsive: {
            0: {
              items: 1,
              nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: false
             }
          }
    });
    if(this.query(".Tool-statusbar-carousel")){
        let perpage = 1;
        let owl = $('.Tool-statusbar-carousel');
        owl.on('initialized.owl.carousel', function(event) {
          console.log("initialized");
          perpage = Math.ceil(event.item.count/event.page.count)
        });
        owl.on('resized.owl.carousel', function(event) {
          console.log("resized");
          perpage = Math.ceil(event.item.count/event.page.count)
        });
        owl.owlCarousel({
            margin: 0,
            nav: true,
            loop: false,
            responsive: {
              0: {
                items: 1,
              },
              600: {
                  items: 2,
              },
              800: {
                  items: 3,
              },
              1200: {
                  items: 4,
              },
               1500: {
                   items: 6,
                   nav: false
                }
            }
      });

      let activeA = this.query(".Tool-statusbar-carousel a.active");
      let activeO = activeA.getAttribute('data-page');
      console.log("perpage", perpage);
      console.log("to page", Math.ceil(activeO/perpage)-1);
      owl.trigger('to.owl.carousel', [Math.ceil(activeO/perpage)-1, 1]);

      console.log(owl);
      // owl.next();
    }
  },

  bindResponsimg: function (){
    img = $(this.el).find('.responsimg');
    img.responsImg({
      allowDownsize: true
    });
  },

  _handleTabbarClick: function(event){
      if(!dom.hasClass(event.delegateTarget, 'active')){
        _.each(this.Tabbars, function(item, index){
          dom.removeClass(item, 'active');
        });
        dom.addClass(event.delegateTarget, 'active');
      }
  },

  _handlePricebarClick: function(event){
    if(!dom.hasClass(event.delegateTarget, 'active')){
      _.each(this.Pricebars, function(item, index){
        dom.removeClass(item, 'active');
      });
      _.each(this.Pricetables, function(item, index){
        dom.removeClass(item, 'active');
      });
      dom.addClass(this.query(event.delegateTarget.getAttribute('href')), 'active');
      dom.addClass(event.delegateTarget, 'active');
    }
  }

});

export default Content;
