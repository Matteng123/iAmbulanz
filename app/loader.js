import header from 'head';

var Loader = {
    queue:null,
    tl:null,
    init: () => {
      head.ready(document, function() {
          head.load(["//connect.facebook.net/en_US/sdk.js", "/assets/css/app.css", "/assets/js/app.js"], Loader.startApp);
      });
    },
    removeLoader: () => {
        console.log("removeLoader");
        document.body.setAttribute("class", document.body.getAttribute("class").split("hideloader").join(""));
        var preloader = document.getElementsByClassName("preloader")[0];
        if(preloader && preloader.parentNode){
            preloader.parentNode.removeChild(preloader);
        }
    },
    startApp: () => {
        var self = this;
        if(window.App == undefined){
            setTimeout(Loader.startApp, 500);
        } else {
            console.log("blastoff");
            App.blastoff();

            document.body.setAttribute("class", document.body.getAttribute("class").split("loading").join("loaded") );

            setTimeout(function(){
-             document.body.setAttribute("class", document.body.getAttribute("class").split("loaded").join("hideloader") );
            }, 500);

            setTimeout(function(){ Loader.removeLoader(); }, 1000);
        }
    }
};

export default Loader;
Loader.init();
