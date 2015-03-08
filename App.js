/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/
define(['underscore', 'jquery', 'backbone', 'bootstrap', 'backbone.controller', 'ComBroker', 'Lib'], function (_, $, Backbone, Bootstrap, backbonecontroller, ComBroker, Lib) {
    var App = Backbone.Controller.extend({

        // app init
        initialize: function () {
            var self = this;
            window.BB = Backbone;
            BB.globs = {};
            BB.SERVICES = {};
            BB.EVENTS = {};
            BB.LOADING = {};
            BB.CONSTS = {};
            BB.globs['UNIQUE_COUNTER'] = 0;
            BB.globs['RC4KEY'] = '226a3a42f34ddd778ed2c3ba56644315';
            BB.lib = new Lib();
            BB.lib.addBackboneViewOptions();
            BB.comBroker = new ComBroker();
            BB.comBroker.name = 'AppBroker';
            window.log = BB.lib.log;
            $.ajaxSetup({cache: false});
            $.ajaxSetup({
                headers: {'Authorization': 'somePasswordHere'}
            });

            self._loadPosts();
            // internationalization
            /*
            require(['localizer'], function () {
                var lang = "en";
                var opts = { language: lang, pathPrefix: "./_lang" };
                $("[data-localize]").localize("local", opts);
            });

            // router init
            require(['LayoutRouter'], function (LayoutRouter) {
                var LayoutRouter = new LayoutRouter();
                BB.history.start();
                BB.comBroker.setService(BB.SERVICES['LAYOUT_ROUTER'], LayoutRouter);
                LayoutRouter.navigate('authenticate/_/_', {trigger: true});
            });
            */
        },

        /**
         Load Digg posts
         @method _loadPosts
         **/
        _loadPosts: function(){
            $.get('https://secure.digitalsignage.com/Digg',function(data){
                log(data);
                _.forEach(data,function(k,v){
                    $('#posts').append('<a href="#" class="list-group-item"><img src="' + k.link + '" </img></i>' + k.title + '</a>');
                });
            });
        }
    });
    return App;
});