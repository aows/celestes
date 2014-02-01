var AppRouter = Backbone.Router.extend({

    routes: {
        "": "home"
    },

    initialize: function () {
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);

        var articleList = new ArticlesCollection();
        articleList.fetch( { 
            success: function() {
                $("#news").html(new ArticleListView({model: articleList}).el);  
            },
            fail: function() {
                console.debug("fail");
            }
        } );

        var coverNewsList = new CoverNewsCollection();
        coverNewsList.fetch( { 
            success: function() {
                $("#cover").html(new CoverNewsListView({model: coverNewsList}).el);
            },
            fail: function() {
                console.debug("fail");
            }
        } );

    }

});

utils.loadTemplate(['HomeView', 'ArticleListItemView', 'CoverNewsListItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});