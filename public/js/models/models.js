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