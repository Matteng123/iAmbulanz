var $ = require('jquery');
var _ = require('underscore');
var PageView = require('./base');
var dom = require('ampersand-dom');
var gsap = require('../vendor/gsap/uncompressed/TweenMax.js');


var Contact = PageView.extend({
	
	props:{
		isinitial: false,
		container: Object,
		form: '',
		formavalues: '',

		reachable: '',

		required: '',
		resetValues: [Boolean, true, false],
		emailReg: [RegExp, true, ""]
	},
    
    events: {
    	'click .togglemenu': 'handleTogglemenu',
        'click #generalcontact-form-submit': 'handleSubmitClick'
        // 'click .checkboxselection': 'handleCheckboxClick',
        // 'click .radioboxselection': 'handleRadioClick',
        // 'click .handle-dropdown': 'handleDropdownClick'
    },

    template: function(){
		var content = this.model.pageContent;
		return content;
	},

    hookBeforeHide: function(){
    },

	hookInRender: function () {
		
		this.container = $(this.el);
		
		this.cacheElements({ });
		this.bindFormular();
		this.handleFooterStyle();
	},

	hookAfterRender: function(){
	},

	handleTogglemenu: function(e){
		window.app.view.handleTogglemenu(e);
	},

	handleFooterStyle: function (){
		footerstyle = $(this.el).find('#footerstyle');
		$('#footer').removeClass('light');
		if( footerstyle.length >= 1 ){
			style = footerstyle.data('footerstyle');
			$('#footer').addClass(style);
		}
	},
	handleDropdownClick: function (e){
		// console.log(e);
		
		// console.log("handleDropdownClick");
		target = $(e.target);
		alldropdown = $(this.el).find('.selection-dropdown');
		dropdown = target.parent().find('.selection-dropdown');
		input = dropdown.find('input');

		if( alldropdown.hasClass('active') && !dropdown.hasClass('active') ){
			alldropdown.removeClass('active');
		}

		if( dropdown.hasClass('active') ){
			dropdown.removeClass('active');
		}else{
			dropdown.addClass('active');
		}
		dropdown.find('.dropdownlayerselection').on('click',function(){
			input.val('');
			value = $(this).find('input').data('value');
			$(this).find('input').val(value);
			target.text(value);
			dropdown.removeClass('active');
		});
	},
	handleRadioClick: function (e){
		// console.log(e);
		target = $(e.target);
		input = target.find('input');
		group = input.data('group');

		// reset
		$('.'+group).removeClass('active');
		$('.'+group).find('input').val('');

		if( target.hasClass('active') ){
			target.removeClass('active');
			input.val('');
		}else{
			target.addClass('active');
			value = input.attr('data-value');
			input.val(value);
		}
	},
	handleCheckboxClick: function (e){
		// console.log(e);
		target = $(e.target);
		input = target.find('input');
		if( target.hasClass('active') ){
			target.removeClass('active');
			input.val('');
		}else{
			target.addClass('active');
			value = input.attr('data-value');
			input.val(value);
		}
	},

	bindFormular: function (){
		if ($(this.el).find('form').length >= 1 ){
			this.cacheElements({
				submitButton: '#generalcontact-form-submit',
				formDom: '#generalcontact-form',
				validationInput: '#generalcontact-form-email-confirmation'
			});

			this.resetValues = true;
			this.isScrollTop = false;
			this.formavalues = this.queryAll('.value');
			// reset checkboxes
			this.checkboxselection = this.queryAll('.checkboxselection');
			this.required = this.queryAll('.required');

			this.newsletter = this.query('#newsletter');

			this.emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

		}
	},

	handleSubmitClick: function(e){
		//console.log("click form");
		e.preventDefault();
		var self = this;
		
		if(this.validationInput.value != ""){
			// Honey Pot = Robot
			return;
		}
		
		// reset 
		_.each(this.required, function(element, index, list){
			dom.removeClass(this.formDom, "invalid");
			dom.removeClass(element, "input-error");
		}, this);

		var invalideObjects = [];
		invalideObjects = _.filter(this.required, function(element, index, list){
				var isval = false;

				// push data in model
				if(element.type == "email"){
					if(element.value != ""){
						isval = this.emailReg.test(element.value);
					}
				}
				if(element.type == "text" || element.type == "textarea"){
					isval = (element.value != "");
				}

				if(!isval){
					dom.addClass(element, "input-error");
				}

				return !isval;
		}, this);


		if(invalideObjects.length == 0){

			// push data in form model:
			_.each(this.formavalues, function(element, index, list){
				this.form[element.name] = element.value;
			}, this);

			_.each(this.checkboxselection, function(element, index, list){
				dom.removeClass(element,"active");
			}, this);

			this.form.send(this.form._values).then(function(success){
				dom.addClass(self.formDom, "issent");
				dom.removeClass(self.formDom, "haserror");
				dom.removeClass(self.formDom, "invalid");

				// reset
				if(self.resetValues){
					_.each(self.formavalues, function(element, index, list){
						element.value = '';
					}, this);
				}
				if(self.isScrollTop){
					TweenMax.to(window, 1, {scrollTo:{y:0, x:0}, ease:Power2.easeInOut});
				}
			}, function(error){
				dom.addClass(self.formDom, "haserror");
				if(self.isScrollTop){
					TweenMax.to(window, 1, {scrollTo:{y:0, x:0}, ease:Power2.easeInOut});
				}
			});

		} 
		else {
			dom.removeClass(this.formDom, "issent");
			dom.removeClass(this.formDom, "invalid-groups");
			dom.addClass(this.formDom, "invalid");

			if(self.isScrollTop){
				TweenMax.to(window, 1, {scrollTo:{y:0, x:0}, ease:Power2.easeInOut});
			}
		}
		

		
	},

	handleScroll: function(value){
	},

});

module.exports = Contact;