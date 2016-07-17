var _ = require('underscore'),
  dom = require('ampersand-dom');

var form = {
  _scrollToTop: function(form){
    TweenMax.to(window, 0.5, {scrollTo:{y:form.offsetTop}, ease:Power2.easeOut});
  },
  _handleRadioClick: function(event){
    var group = event.delegateTarget.parentNode,
        radios = group.childNodes,
        input = event.delegateTarget.firstElementChild;

    _.each(radios, function(node){
      if(dom.hasClass(node, 'isChecked')){
          dom.removeClass(node, 'isChecked');
          node.firstElementChild.removeAttribute('checked');
      }
    });
    dom.addClass(event.delegateTarget, 'isChecked');
    input.setAttribute('checked', true);
  },
  _handleCheckboxClick: function(event){
    var input = event.delegateTarget.firstElementChild;

    if(dom.hasClass(event.delegateTarget, 'isChecked')){
      dom.removeClass(event.delegateTarget, 'isChecked');
      input.removeAttribute('checked');
    }else{
      dom.addClass(event.delegateTarget, 'isChecked');
      input.setAttribute('checked', true);
    }
  },
  _findFormTag: function(target){
    if(target.parentNode.nodeName.toUpperCase() == "FORM"){
      return target.parentNode;
    } else {
      if(target.nodeName.toUpperCase() == "BODY"){
        return null;
      } else {
        return this._findFormTag(target.parentNode);
      }
    }
  },
  _findParentByClass: function(target, className){
    if(dom.hasClass(target.parentNode, className)){
      return target.parentNode;
    } else {
      if(target.nodeName.toUpperCase() == "BODY"){
        return null;
      } else {
        return this._findParentByClass(target.parentNode, className);
      }
    }
  },
  _handleFormSubmitClick: function(event){

    event.preventDefault();

    var that = this,
        errorClass = 'haserror',
        elementClass = 'Form-element',
    form = this._findFormTag(event.delegateTarget),
    formid, formsent, honeypot, inputs, textareas, radios, radiogroups, checkboxes, checkboxgroups, errors;

    if(form === null){
      throw(new Error("The DOM misses a Form-tag."));
    } else {
      formid = '#' + form.getAttribute('id');
      that.formModel.fields.uid = form.getAttribute('data-url');
    }

    honeypot = this.query(formid + ' .emailvalidation input');
    if(honeypot.value !== ""){
      return;
    }

    formsent = this.query(formid + ' .Form-sentmessage div');

    errors = [];
    dom.removeClass(form, errorClass);
    _.each(this.queryAll(formid + ' .' + errorClass), function(erroritem){
      dom.removeClass(erroritem, errorClass);
    });

    inputs = this.queryAll(formid + ' input[type=text]');
    _.each(inputs, function(input){
      that.formModel.fields[input.getAttribute('name')] = input.value;
      if(input.required){
        if(input.value === "" || input.value.length < 1){
          errors.push(input);
        }
      }
    });

    textareas = this.queryAll(formid + ' textarea');
    _.each(textareas, function(area){
      that.formModel.fields[area.getAttribute('name')] = area.value;
      if(area.required){
        if(area.value === "" || area.value.length < 1){
          errors.push(area);
        }
      }
    });

    radios = this.queryAll(formid + ' input[type=radio]');
    radiogroups = {};
    _.each(radios, function(radio){
      if(radiogroups[radio.getAttribute('name')] === undefined){
        radiogroups[radio.getAttribute('name')] = [];
      }
      radiogroups[radio.getAttribute('name')].push(radio);
    });
    _.each(radiogroups, function(radiogroup, index){
      that.formModel.fields[index] = "";
      var isrequired = false;
      _.each(radiogroup, function(radiobutton){
        if(radiobutton.required) isrequired = true;
        if(radiobutton.getAttribute('checked')){
          that.formModel.fields[index] = radiobutton.value;
        }
      });
      if(isrequired && that.formModel.fields[index] === ""){
        errors.push(radiogroup);
      }
    });

    checkboxes = this.queryAll(formid + ' input[type=checkbox]');
    checkboxgroups = {};
    _.each(checkboxes, function(checkbox){
      if(checkboxgroups[checkbox.getAttribute('name')] === undefined){
        checkboxgroups[checkbox.getAttribute('name')] = [];
      }
      checkboxgroups[checkbox.getAttribute('name')].push(checkbox);
    });
    _.each(checkboxgroups, function(checkboxgroup, index){
      that.formModel.fields[index] = "";
      var isrequired = false;
      _.each(checkboxgroup, function(checkbox){
        if(checkbox.required) isrequired = true;
        if(checkbox.getAttribute('checked')){
          if(that.formModel.fields[index] === "") that.formModel.fields[index] = checkbox.value;
          else that.formModel.fields[index] = that.formModel.fields[index] + ', ' + checkbox.value;
        }
      });
      if(isrequired && that.formModel.fields[index] === ""){
        errors.push(checkboxgroup);
      }
    });

    if(errors.length > 0){
      that._scrollToTop(form);
      dom.addClass(form, errorClass);
      _.each(errors, function(erroritem){
        var FormItem;
        if(erroritem.length > 0){
          FormItem = that._findParentByClass(erroritem[0], elementClass);
        } else {
          FormItem = that._findParentByClass(erroritem, elementClass);
        }

        if(FormItem === null){
          if(erroritem.length > 0){
            dom.addClass(erroritem[0].parentNode, errorClass);
          } else {
            dom.addClass(erroritem.parentNode, errorClass);
          }
        } else {
          dom.addClass(FormItem, errorClass);
        }
      });
    } else {

      that.formModel.send(this.formModel.fields).then(function(success){
        formsent.innerHTML = success.message;
        dom.addClass(form, "issent");

        // reset
        _.each(inputs, function(element, index, list){
          element.value = '';
        }, this);
        _.each(textareas, function(element, index, list){
          element.value = '';
        }, this);
        _.each(radios, function(element, index, list){
          element.removeAttribute('checked');
          dom.removeClass(element.parentNode, 'isChecked');
        }, this);
        _.each(checkboxes, function(element, index, list){
          element.removeAttribute('checked');
          dom.removeClass(element.parentNode, 'isChecked');
        }, this);

        that._scrollToTop(form);

      }, function(error){
        dom.addClass(form, "issent");
        formsent.innerHTML = error.message;
        that._scrollToTop(form);
      });

      console.log(that.formModel.fields);
    }

  }

};

module.exports = form;
