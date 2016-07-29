/* global me, app */
import AmpersandRouter from 'ampersand-router';
import FormModel from './models/form';
import ContentModel from './models/content';
import ContentView from './pages/content';



let Router = AmpersandRouter.extend({
    routes: {
        '(*path)': 'content'
    },

    // ------- ROUTE HANDLERS ---------
    content: function (value) {
        this.trigger('page', new ContentView({
            model: new ContentModel({id:value}),
            formModel: new FormModel()
        }));
    }
});

export default Router
