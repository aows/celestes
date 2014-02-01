window.ArticleListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var articles = this.model.models;
        var len = articles.length;

        $(this.el).html('<ul class="news"></ul>');

        _.each( articles, function( article ) {
            $('.news', this.el).append(new ArticleListItemView({model: article}).render().el);
        }, this);

        return this;
    }
});

window.ArticleListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});


window.CoverNewsListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var articles = this.model.models;
        var len = articles.length;

        $(this.el).html('<div class="row"></div>');

        _.each( articles, function( article ) {
            $('.row', this.el).append(new CoverNewsListItemView({model: article}).render().el);
        }, this);

        return this;
    }
});

window.CoverNewsListItemView = Backbone.View.extend({

    tagName: "div",

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON())).addClass("col-md-4");
        return this;
    }

});