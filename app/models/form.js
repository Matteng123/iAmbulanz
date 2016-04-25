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
        nachname: ["string", true, ""],
        vorname: ["string", true, ""],
        email: ["string", true, ""],
        phone: ["string", false, ""],
        street: ["string", false, ""],
        adress: ["string", false, ""],
        message: ["string", false, ""],
        // settings
        author: ["string", true, "CADMAN"],
        // emailTo: ["string", true, "vertrieb@pro-urban.de"],
        emailTo: ["string", true, "info@flincarre.de"],
        emailBcc: ["string", true, "interactive@cadman.de"],
        emailFrom: ["string", true, "no-reply@flincarre.de"],
        subject: ["string", false, "Web Kontakt Anfrage Flin Carre:"],
        error: ["boolean", false, false],
        success: ["boolean", true, false]
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
            this.set(attrs);
        }
        this.isSending = true;


        return new Promise(function (resolve, reject) {
            that._request = sync.call(that, "create", that, {
                data: qs.stringify(that.toJSON()),
                url: "/ajaxform/sendEmail.php",
                error: function (resp, state, msg) {
                    that.isSending = false;
                    reject(new Error(msg));
                },
                success: function (resp) {
                    that.isSending = false;
                    if (resp.success) {
                        that.success = true;
                        resolve(that);
                    } else if (resp.error) {
                        that.error = resp.error;
                        reject(new Error("The message did not validate."));
                    }
                }
            });
        });
    },

});

module.exports = Form;
