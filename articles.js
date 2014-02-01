var FeedParser = require('feedparser')
    request = require('request'),
    _ = require("underscore"),
    articles = [];

var sources = [ { name: 'Moi Celeste', url: 'http://www.moiceleste.com/feeds/posts/default?alt=rss' },
                { name: 'Noticias Celta', url: 'http://feeds.feedburner.com/noticiascelta/tMXm' } ];

exports.showAll = function(req, res) {
	var toRet = _.sortBy( articles, function( article ) {
					return new Date(article.pubdate);
				}).reverse();
    res.send( _.first( toRet, 20 ) );
};

exports.coverNews = function(req, res) {
	var today = new Date(),
	    from = new Date(),
	    news;
	from.setHours( today.getHours() - 72 );
	news = _.filter( articles, function( article ) {
				return new Date(article.pubdate) > from;
			});				
	news = _.sortBy( news, "score").reverse();
	res.send( _.first( news, 3 ) );
}

exports.parseFeeds = function() {
	articles = [];
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
		    	while (item = stream.read()) {
		    		var article = {
		    			id: item.link,
			      		link: item.link,
			      		title: item.title,
			      		summary: item.summary,
			      		description: item.description,
			      		pubdate: item.pubdate,
			      		image: item.image,
			      		source: source.name,
			      		score: 0
		    		};
		    		
		    		request( { url: "https://api.facebook.com/method/fql.query?query=select total_count,like_count,comment_count,share_count,click_count from link_stat where url='" + item.link + "'&format=json",
		    			       timeout: 1000 },
		    			function( error, response, body ) {
		    				if ( !error && response.statusCode == 200 ) {
		    					article.score += eval(body)[0].total_count;
		    					articles.push( article );
		    				}
		    			}
		    		);

		    	}
			});
	});

};

