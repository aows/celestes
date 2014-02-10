window.Article = Backbone.Model.extend({

    urlRoot: "/articles",

    initialize: function () {

    },

    defaults: {
        id: null,
        link: "",
        title: "",
        summary: "",
        description: "",
        pubdate: "",
        image: "",
        source: ""
    }
});

window.ArticlesCollection = Backbone.Collection.extend({

    model: Article,

    url: "/articles"

});

window.CoverNewsCollection = Backbone.Collection.extend({

    model: Article,

    url: "/articles/cover"

});

window.Game = Backbone.Model.extend({

    defaults: {
        id: null,
        home: "",
        iconHome: null,
        score: null,
        away: "",
        iconAway: null,
        time: null
    }

});

window.GamesCollection = Backbone.Collection.extend({

    model: Game,

    url: "/games"

});

window.NextGame = Backbone.Collection.extend({

    model: Game,

    url: "/games/next"

});

window.Team = Backbone.Model.extend({
    defaults: {
        team: "",
        points: 0
    }
});

window.TeamsCollection = Backbone.Collection.extend({

    model: Team,

    url: "/standings"

})