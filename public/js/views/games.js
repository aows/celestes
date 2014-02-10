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

    render: function () {
        var template = Handlebars.compile(this.template());
        $(this.el).html(template(this.model.toJSON()));
        return this;
    }

});

window.NextGameView = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        var template = Handlebars.compile(this.template());
        $(this.el).html(template(this.model.models[0].toJSON()));
        return this;   
    }

});

window.StandingsView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {

        _.each( this.model.models, function( team ) {
            $(this.el).append(new StandingsItemView({model: team}).render().el);
        }, this);

        return this;
    }
});

window.StandingsItemView = Backbone.View.extend({

    initialize: function() {
        var cssClass = "label-default",
            progressBar = "progress-bar-normal",
            pos = this.model.get("position");

        if ( this.model.get("team") === "celta" ) {
            cssClass = "label-info";
            progressBar = "progress-bar-info";
        } else {
            if ( pos >= 1 && pos <= 4 ) {
                cssClass = "label-success";
                progressBar = "progress-bar-success";
            } else if ( pos >= 5 && pos <= 6 ) {
                cssClass = "label-warning";
                progressBar = "progress-bar-warning";
            } else if ( pos >= 18 && pos <= 20 ) {
                cssClass = "label-danger";
                progressBar = "progress-bar-danger";
            }
        }
        this.model.set( "cssClass", cssClass );
        this.model.set( "progressBar", progressBar );
    },

    render: function() {
        var template = Handlebars.compile(this.template());
        $(this.el).html(template(this.model.toJSON()));
        return this;
    }

});