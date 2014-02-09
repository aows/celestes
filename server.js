var express = require('express'),
    path = require('path'),
    cron = require('cron'),
    articles = require('./articles'),
    games = require('./games');
 
// config cron jobs the articles
new cron.CronJob('00 */30 * * * *', articles.parseFeeds, null, true);
articles.parseFeeds();

games.parseGames();

// init the app
var app = express();
 
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/articles', articles.showAll);
app.get('/articles/cover', articles.coverNews);
app.get('/games', games.latestGames);

var port = Number(process.env.PORT || 5000); 
app.listen(port, function() {
  console.log("Listening on " + port);
});
