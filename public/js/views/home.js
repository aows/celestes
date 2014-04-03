window.HomeView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        /*
        $.get( 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCTv-XvfzLX3i4IGWAm4sbmA&q=celta&key=AIzaSyDMppAkI3AMT9B04Ysi9SbZUp_RgOM3hpg&order=date', function( data ) {
            console.debug( data );
        });
        */
        $(this.el).html(this.template());
        return this;
    }

});

window.StatsView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});

window.CommunityView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});

window.LoadingView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});