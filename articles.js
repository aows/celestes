var FeedParser = require('feedparser')
    request = require('request'),
    _ = require("underscore"),
    articles = [];

var sources = [ { name: 'Moi Celeste', url: 'http://www.moiceleste.com/feeds/posts/default?alt=rss' },
                { name: 'Noticias Celta', url: 'http://feeds.feedburner.com/noticiascelta/tMXm' } ];

exports.showAll = function(req, res) {
	toRet = _.sortBy( articles, function( article ) {
				return new Date(article.pubdate);
			}).reverse();
    res.send( toRet );
};

exports.parseFeeds = function() {
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
		      		articles.push( {
		      		id: item.link,
		      		link: item.link,
		      		title: item.title,
		      		summary: item.summary,
		      		description: item.description,
		      		pubdate: item.pubdate,
		      		image: item.image,
		      		source: source.name
		      	} );
		    }
		});
	});

};

