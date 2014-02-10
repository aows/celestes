var request = require('request'),
    _ = require("underscore"),
    jsdom = require("jsdom"),
    url = "http://resultados-futbol.com/Celta",
    games = [],
    regexImg = /src=["|'](.+?[\.jpg|\.gif|\.png].+?)["|']/;

exports.parseGames = function() {
	games = [];
	jsdom.env( {
		url: url,
		scripts: ["http://code.jquery.com/jquery.js"],
		done: function ( errors, window ) {
			var $ = window.$;
			_.each( $('div#liga2401 tr'), function ( game ) {
				var home = $('td[class=team-home]', game).text().trim().toLowerCase(),
					iconHome = $('td[class=team-home]', game).html().match(regexImg)[1],
					score = $('td[class="score bold "]', game).text().trim().toLowerCase(),
					away = $('td[class=team-away]', game).text().trim().toLowerCase(),
					iconAway = $('td[class=team-away]', game).html().match(regexImg)[1],
					time = $('td[class=time]', game).text().trim().toLowerCase();

				if ( !score.match(/[0-9]\s-\s[0-9]/) ) {
					time = time + ", " + score;
					score = null;
				}
				games.push( { home: home, iconHome: iconHome, score: score, away: away, iconAway: iconAway, time: time } );
			} );
			console.log("games processed: " + games.length);
		}
	} );
}

exports.latestGames = function(req, res) {
	res.send( _.first( 
				_.filter( games, function( game ) {
					return game.score;
				}),
		5 ) );
}

exports.nextGame = function(req, res) {
	res.send( _.last( 
				_.filter( games, function( game ) {
					return game.score === null;
				})
			) );
}