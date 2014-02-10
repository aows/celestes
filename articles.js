var FeedParser = require('feedparser')
    request = require('request'),
    _ = require("underscore"),
    articles = [],
    cover = [];

var sources = [ { name: 'Moi Celeste', url: 'http://www.moiceleste.com/feeds/posts/default?alt=rss' },
                { name: 'Noticias Celta', url: 'http://feeds.feedburner.com/noticiascelta/tMXm' },
                { name: 'Marca.com', url: 'http://marca.feedsportal.com/rss/futbol_equipos_celta.xml' },
                { name: 'La Voz de Galicia', url: 'http://www.lavozdegalicia.es/celta/index.xml' } ];

exports.showAll = function(req, res) {
	if ( _.isEmpty( cover ) ) {
		cover = parseCover();
		articles = parseArticles();
	}
    res.send( _.first( articles, 10 ) );
};

exports.coverNews = function(req, res) {
	if ( _.isEmpty( cover ) ) {
		cover = parseCover();
		articles = parseArticles();
	}
	res.send( cover );
};

exports.parseFeeds = function() {
	articles = [];
	cover = [];
	_.each( sources, function( source ) {

		request( source.url, { timeout: 5000 } )
			.on('error', function (error) {
		    	console.error(error);
		  	})
		  	.pipe(new FeedParser())
		  	.on('error', function (error) {
			    console.error(error);
			  })
			.on('meta', function (meta) {
		    	console.log('===== %s =====', meta.title);
		  	})
		  	.on('readable', function() {
		    	var stream = this, item;
		    	var regex = /(<([^>]+)>)/ig;
		    	var regexImg = /src=["|'](.+?[\.jpg|\.gif|\.png])["|']/;
		    	while (item = stream.read()) {
		    		var article = {
		    			id: item.link,
			      		link: item.link,
			      		title: item.title,
			      		summary: item.summary ? item.summary.replace(regex, "") : null,
			      		description: item.description.replace(regex, ""),
			      		pubdate: item.pubdate,
			      		image: item.image,
			      		source: source.name,
			      		score: 0
		    		};
		    		if ( item.description.match( regexImg ) ) {
		    			article.descImage = item.description.match( regexImg )[1];
		    		}
		    		request( { url: "https://api.facebook.com/method/fql.query?query=select total_count,like_count,comment_count,share_count,click_count from link_stat where url='" + item.link + "'&format=json",
		    			       timeout: 2000 },
		    			function( error, response, body ) {
		    				if ( !error && response.statusCode == 200 ) {
		    					article.score += eval(body)[0].total_count;
		    					articles.push( article );
		    				} else {
		    					articles.push( article );
		    				}
		    			}
		    		);

		    	}
			});
	});

};

function parseCover() {
	var today = new Date(),
	    from = new Date(),
	    news;
	from.setHours( today.getHours() - 48 );
	news = _.filter( articles, function( article ) {
				return new Date(article.pubdate) > from;
			});				
	news = _.sortBy( news, "score").reverse();
	return _.first( news, 3 );
};

function parseArticles() {
	var tmpArticles = [],
	    tmpCover = [];

	articles = _.sortBy( articles, function( article ) {
					return new Date(article.pubdate);
				}).reverse();

	tmpCover = _.pluck( cover, "link" );
	
	_.each( articles, function( article ) {
		if ( !_.contains( tmpCover, article.link ) ) {
			tmpArticles.push( article );
		}
	});

	return tmpArticles;
};

