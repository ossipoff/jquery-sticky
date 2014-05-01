(function ($) {
    'use strict';
    
    var $window = $(window);
    var stickies = [];
    
    var defaults = {};
    
    var methods = {
        add: function(options) {
            var $this = $(this),
                sticky = $.extend({
                    $elem: $(this)
                }, {
                    top: $this.position().top,
                    left: $this.position().left,
                    position: $this.css('position')
                }, options);
            stickies.push(sticky);
        },
        remove: function() {
            var elem = this;
            stickies = $.grep(stickies, function(sticky, i) {
                if (sticky.$elem[0] === elem) {
                    sticky.$elem.css({ position: sticky.position });
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
                sticky.$elem.css({ position: 'fixed', top: sticky.top, left: sticky.left });
            } else {
                sticky.$elem.css({ position: sticky.position });
            }
        });
    });
    
    $.fn.sticky = function() {
        var method , args, options = {};

        if (arguments.length > 0) {
            method = methods[arguments[0]];

            if (method) {
                args = Array.prototype.slice.call(arguments, 1);
            } else {
                args = [$.extend(options, defaults, arguments[0])];
            }
        }
        
        if (!method) {
            method = methods['add'];
        }
        
        this.each(function () {
            method.apply(this, args);
        });
    }
})(jQuery);
