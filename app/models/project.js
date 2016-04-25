/*global $*/
// base view for pages
var Model = require('./base');
var _ = require('underscore');
//var key = require('keymaster');

var Content = Model.extend({
    layer: {
        'basic': {
            type: 'point',
            url: '/assets/maps/export/layers.geojson',
            range: [0, 25],
            isactive: true,
            instance: null,
            icons: {
                iconSize:     [53, 52], // size of the icon
                iconAnchor:   [26, 52], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -52], // point from which the popup should open relative to the iconAnchor
                shadowSize:   [40, 39], // size of the shadow
                shadowAnchor: [40, 39]  // the same for the shadow
            }
        }
    },
    positions: {
        'wien-the-icon': {
            center: [16.378020, 48.186125],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-austria-campus': {
            center: [16.393078, 48.223659],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'muenchen-alte-akademie': {
            center: [11.56956, 48.13888],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'hamburg-alsterhaus': {
            center: [9.992380, 53.553144],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'salzburg-forum-1': {
            center: [13.045190, 47.8142094],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-goldenes-quartier': {
            center: [16.3689203999, 48.2098099],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-graben-19': {
            center: [16.368304, 48.209455],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-izd-tower': {
            center: [16.420856, 48.23471],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        // 'wien-kaertnerstrasse-9': {
        //     center: [16.371843, 48.20722],
        //     zoom: 17,
        //     bearing: 12,
        //     pitch: 30
        // },
        'wien-kaertnerstrasse-11': {
            center: [16.371787, 48.206948],
            zoom: 17,
            bearing: 12,
            pitch: 30
        },
        'berlin-karstadt-kudamm': {
            center: [13.332975, 52.503624],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'stuttgart-koenigstrasse-27': {
            center: [9.1760077, 48.775596],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'berlin-kadewe': {
            center: [13.341294, 52.502099],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'bozen-kaufhaus': {
            center: [11.356060, 46.497299],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'innsbruck-kaufhaus-tyrol': {
            center: [11.394521, 47.265511],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-generali-tower': {
            center: [16.42107050, 48.2354069],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-mariahilfer-strasse-38-40': {
            center: [16.354007, 48.1999020],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-mariahilfer-strasse-57-59': {
            center: [16.352405, 48.1990366],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'muenchen-operpollinger': {
            center: [11.5675529, 48.139359],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-austria-postsparkasse': {
            center: [16.381194, 48.2099703],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-parkapartments': {
            center: [16.383666, 48.1849925],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-kunstforum': {
            center: [16.366160, 48.2116713],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'gardone-villa-eden': {
            center: [10.559564, 45.6181853],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'parndorf-bigg': {
            center: [16.84917589, 47.97744409],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'linz-haus-tourismus': {
            center: [14.29191049, 48.32179610],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'hamburg-karstadt-sports': {
            center: [9.998228599, 53.551211599],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'muenchen-karstadt-sports': {
            center: [11.56709239, 48.1391033],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'innsbruck-medicent': {
            center: [11.3774396, 47.25610049],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'salzburg-medicent': {
            center: [13.0195926, 47.8043209],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'linz-medicent': {
            center: [14.29932680, 48.3141892],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'baden-medicent': {
            center: [16.2560573, 47.9968383],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'innsbruck-west': {
            center: [11.3734569, 47.2646546],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-hotel-andaz': {
            center: [16.3874705, 48.1814505],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-park-hyatt': {
            center: [16.3680758, 48.2106304],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'wien-kunstforum': {
            center: [16.366160, 48.2116713],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'eschborn-the-cube': {
            center: [8.568340, 50.13558],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'zagreb-hoto-business': {
            center: [15.96352090, 45.8015189],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'muenchen-eataly': {
            center: [11.576170, 48.13547],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'innsbruck-signa-buero': {
            center: [11.39439471, 47.2655209390],
            zoom: 18,
            bearing: 12,
            pitch: 30
        },
        'wien-signa-buero': {
            center: [16.3653805, 48.21164939],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'muenchen-signa-buero': {
            center: [11.5737500, 48.14253],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'duesseldorf-signa-buero': {
            center: [6.7763780, 51.2233201],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'luxemburg-signa-buero': {
            center: [6.215687, 49.634756],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'zuerich-signa-buero': {
            center: [8.5504948, 47.37120609],
            zoom: 16,
            bearing: 12,
            pitch: 30
        },
        'sirmione-signa-repraesentation': {
            center: [10.6089365, 45.48018690],
            zoom: 16,
            bearing: 12,
            pitch: 30
        }
        
    },
    urlRoot: '/',
    props: {
    	id: ['string', false, ''],
    	path: ['string', false, '']
    },
    url: function () {
		this.urlRoot = this.urlRoot + this.path + "/";
        var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
        if (this.isNew()) url = base;
        else url = base + (base.charAt(base.length - 1) === '/' ? '' : '/') + this.getId() ;
        return url;
    }

});

module.exports = Content;