(function ($) {
    'use strict';
    
    var $window = $(window);
    var stickies = [];
    
    var defaults = {};
    
    var methods = {
        add: function(options) {
            var sticky = {};
            sticky.$elem = $(this);
            sticky.position = sticky.$elem.position();
            sticky.cssPosition = sticky.$elem.css('position');
            stickies.push(sticky);
        },
        remove: function() {
            var elem = this;console.log(stickies);
            stickies = $.grep(stickies, function(sticky, i) {
                if (sticky.$elem[0] === elem) {
                    sticky.$elem.css({ position: sticky.cssPosition });
                    return false;
                } else {
                    return true;
                }
            });
            
        }
    };
    
    $window.on('scroll', function(e) {
        $.each(stickies, function(index, sticky) {
            if ($window.scrollTop() > sticky.$elem.scrollTop() || $window.scrollLeft() > sticky.$elem.scrollLeft()) {
                sticky.$elem.css({ position: 'fixed', top: sticky.position.top, left: sticky.position.left });
            } else {
                sticky.$elem.css({ position: sticky.cssPosition });
            }
        });
    });
    
    $.fn.sticky = function() {
        var method, args;
        var method, args, options = {};

        if (arguments.length > 0) {
            method = methods[arguments[0]];

            if (method) {
                args = Array.prototype.slice.call(arguments, 1);
            } else {
                options = $.extend(options, defaults, arguments[0]);
            }
        } else {
            method = methods['add'];
        }
        
        this.each(function () {
            method.apply(this);
        });
    }
})(jQuery);
