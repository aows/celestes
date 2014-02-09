var AppRouter = Backbone.Router.extend({

    routes: {
        "": "home",
        "community": "community"
    },

    initialize: function () {
    },

    home: function (id) {
        var that = this;

        this._select("home_link");
        
        this.homeView = new LoadingView();
        $('#content').html(this.homeView.el);

        setTimeout( function() {

        var articleList = new ArticlesCollection();
        var coverNewsList = new CoverNewsCollection();

        $.when(articleList.fetch(), coverNewsList.fetch()).done( function() {
            that.homeView = new HomeView();
            $('#content').html(that.homeView.el);
            $("#news").html(new ArticleListView({model: articleList}).el);
            $("#cover").html(new CoverNewsListView({model: coverNewsList}).el);
        } );

    }, 1000);

    },

    community: function() {

        this._select("community_link");

        $('#content').html(new LoadingView().el);

        setTimeout( function() {

        var communityView = new CommunityView();
        $('#content').html(communityView.el);        
    }, 1000);

    },

    _select: function( id ) {

        _.each( $(".masthead-nav li"), function( menuOption ) {
            $menuOption = $(menuOption);
            if ( $menuOption.attr("id") === id ) {
                $menuOption.addClass("active");
            } else {
                $menuOption.removeClass("active");
            }
        });

    }


});

utils.loadTemplate(['HomeView', 'CommunityView', 'LoadingView', 'ArticleListItemView', 'CoverNewsListItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});