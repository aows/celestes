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
                $("#content").html(new ArticleListView({model: articleList}).el);  
            },
            fail: function() {
                console.debug("fail");
            }
        } );

    }

});

utils.loadTemplate(['HomeView', 'ArticleListItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});