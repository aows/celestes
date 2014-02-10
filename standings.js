var request = require('request'),
    _ = require("underscore"),
    jsdom = require("jsdom"),
    url = "http://resultados-futbol.com/Celta",
    teams = [];

exports.parseStandings = function() {
	teams = [];
	jsdom.env( {
		url: url,
		scripts: ["http://code.jquery.com/jquery.js"],
		done: function ( errors, window ) {
			var $ = window.$,
			    maxPoints = 0;
			_.each( _.last( $( 'tr', $('div#caja_clasificacion')[0] ), 20 ), function ( team ) {
				var teamName = $( '[class=equipo]', team ).text().trim().toLowerCase(),
					points = parseInt( $( '[class=pts]', team ).text().trim() ),
					position = parseInt( $( 'th', team).text().trim() );
				
				maxPoints = ( maxPoints === 0 ) ? points : maxPoints;

				teams.push( { 
					team: teamName, 
					points: points, 
					position: position, 
					pctg: Math.round( ( points * 100 / maxPoints ) * 100) / 100 
				} );
			} );
			console.log( "teams processed: " + teams.length );
		}
	} );
}

exports.standings = function( req, res ) {
	res.send( teams );
}