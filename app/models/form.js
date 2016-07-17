var State = require("ampersand-state");
var sync = require("ampersand-sync");
var qs = require("qs");
var Promise = require("es6-promise").Promise;

var Form = State.extend({

    ajaxConfig: {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
        }
    },

    props: {
        action: ["string", true, "contactForm/sendMessage"],
        fields: ["object", true, function(){return [];}],
        author: ["string", true, "iAmbulanz"],
        error: ["boolean", false, false],
        success: ["boolean", true, false],
        message: ["string", true, ""]
    },

    session: {
        isSending: ["boolean", true, false]
    },

    derived: {
        isSend: {
            deps: ["success"],
            fn: function () {
                return this.success;
            }
        }
    },

    send: function (attrs) {
        var that = this;
        if (attrs) {
            attrs.author = that.author;
        }
        this.isSending = true;

        return new Promise(function (resolve, reject) {
            that._request = sync.call(that, "create", that, {
                data: qs.stringify(attrs),
                url: "/api/forms/",
                error: function (resp, state, msg) {
                    that.isSending = false;
                    reject(new Error(msg));
                },
                success: function (resp) {
                    var parse = resp;
                    that.isSending = false;
                    if (parse.success) {
                        that.success = true;
                        that.message = parse.message;
                        resolve(that);
                    } else if (parse.error) {
                        that.error = parse.error;
                        that.message = parse.message;
                        reject(new Error("The message did not validate."));
                    }
                }
            });
        });
    },

});

module.exports = Form;
