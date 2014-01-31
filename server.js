var express = require('express'),
    path = require('path'),
    articles = require('./articles');
 
// get the articles
articles.parseFeeds();

// init the app
var app = express();
 
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/articles', articles.showAll);
 
app.listen(3000);
console.log('Listening on port 3000...');