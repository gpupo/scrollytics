(function($) {
    jQuery.scrollytics = function(options) {
        var settings = $.extend({
            track: [0, 25, 50, 75, 100],
            debug: false,
        }, options);

        sendEvent(0);

        var docHeight = $(document).height();

        var marks = {
            '25': parseInt(docHeight * 0.25, 10),
            '50': parseInt(docHeight * 0.50, 10),
            '75': parseInt(docHeight * 0.75, 10),
            '100': docHeight - 10
        };

        var $window = $(window), cache = [];
        var winHeight = window.innerHeight ? window.innerHeight : $window.height();

        function sendEvent(label) {
            if ($.inArray(parseInt(label), settings.track) !== -1) {
                ga('send', 'event', 'Scroll', 'Percentage', label);
                debug('[Send Event] Scroll Percentage:' + label);
            }
        }
        
        function debug(message) {
            if (settings.debug === true) {
                console.log(message);
            }
        }
        $window.scroll(function() {
            var scrollDistance = $window.scrollTop() + winHeight;
            $.each(marks, function(key, val) {
                if ($.inArray(key, cache) === -1 && scrollDistance >= val) {
                    sendEvent(key);
                    cache.push(key);
                }
            });
        });
    };
}(jQuery));