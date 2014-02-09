window.LatestGamesListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {

        _.each( this.model.models, function( game ) {
            $(this.el).append(new GameListItemView({model: game}).render().el);
        }, this);

        return this;
    }
});

window.GameListItemView = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
        var template = Handlebars.compile(this.template());
        $(this.el).html(template(this.model.toJSON()));
        return this;
    }

});