var AppRouter = Backbone.Router.extend({

    routes: {
        "": "home"
    },

    initialize: function () {
    },

    home: function (id) {
        var that = this;
        
        this.homeView = new LoadingView();
        $('#content').html(this.homeView.el);

        var articleList = new ArticlesCollection();
        var coverNewsList = new CoverNewsCollection();

        $.when(articleList.fetch(), coverNewsList.fetch()).done( function() {
            that.homeView = new HomeView();
            $('#content').html(that.homeView.el);
            $("#news").html(new ArticleListView({model: articleList}).el);
            $("#cover").html(new CoverNewsListView({model: coverNewsList}).el);
        } );

    }

});

utils.loadTemplate(['HomeView', 'LoadingView', 'ArticleListItemView', 'CoverNewsListItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});