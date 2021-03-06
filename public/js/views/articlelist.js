window.ArticleListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {

        _.each( this.model.models, function( article ) {
            // format date
            article.set("formattedDate", new Date(article.get("pubdate")).format("hh:MM dd/mm/yy"));

            $(this.el).append(new ArticleListItemView({model: article}).render().el);
        }, this);

        $( 'span.timeago', this.el ).timeago();

        return this;
    }
});

window.ArticleListItemView = Backbone.View.extend({

    tagName: "a",

    initialize: function () {
    },

    render: function () {
        var template = Handlebars.compile(this.template());
        $(this.el).html(template(this.model.toJSON())).addClass("list-group-item");
        $(this.el).attr('href', this.model.get('link'));
        return this;
    }

});


window.CoverNewsListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {

        $(this.el).html('<div class="row"></div>');

        _.each( this.model.models, function( article ) {
            // format the date
            article.set("formattedDate", new Date(article.get("pubdate")).format("hh:MM dd/mm/yy"));
            // shortening description
            var text = article.get("description").split(' ').slice(0, 40).join(' ');
            article.set("description", text);

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
        var template = Handlebars.compile(this.template());
        $(this.el).html(template(this.model.toJSON())).addClass("col-md-4");
        return this;
    }

});