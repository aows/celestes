var AppRouter = Backbone.Router.extend({

    routes: {
        "": "home",
        "noticias": "home",
        "estadisticas": "stats",
        "comenta": "community"
    },

    initialize: function () {
    },

    home: function (id) {
        var that = this;

        this._select("home_link");
        
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

    },

    stats: function() {

        this._select("stats_link");

        $('#content').html(new LoadingView().el);

        var gamesList = new GamesCollection();
        var nextGame = new NextGame();
        var standings = new TeamsCollection();

        $.when( gamesList.fetch(), nextGame.fetch(), standings.fetch() ).done( function() {
            $('#content').html(new StatsView().el);
            $('#nextGame').html(new NextGameView({model: nextGame }).el)
            $('#latestGames').html(new LatestGamesListView({model: gamesList }).el);
            $('#standings_first').html(new StandingsView({ model: new TeamsCollection( _.first( standings.models, 10 ) ) }).el);
            $('#standings_last').html(new StandingsView({ model: new TeamsCollection( _.last( standings.models, 10 ) ) }).el);
        });

    },

    community: function() {

        this._select("community_link");

        $('#content').html(new LoadingView().el);

        var communityView = new CommunityView();
        $('#content').html(communityView.el);

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

utils.loadTemplate(['HomeView', 'CommunityView', 'StatsView', 'LoadingView', 
                    'GameListItemView', 'NextGameView', 'ArticleListItemView', 
                    'StandingsItemView', 'CoverNewsListItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});