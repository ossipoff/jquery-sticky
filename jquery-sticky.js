(function ($) {
  'use strict';

  function checkStickyPosition(sticky) {
    var scrollStyle = null;

    if ($window.scrollTop() > sticky.initialPosition.top) {
      scrollStyle = $.extend({ position: 'fixed' }, sticky.verticalStyle);
    } else {
      sticky.$elem.css(sticky.initialVerticalStyle);
    }

    if ($window.scrollLeft() > sticky.initialPosition.left) {
      scrollStyle = $.extend(scrollStyle, { position: 'fixed' }, sticky.horizontalStyle);
    } else {
      sticky.$elem.css(sticky.initialHorizontalStyle);
    }

    if (scrollStyle != null) {
      if (sticky.$substituteElem.parent().length == 0) {
        sticky.$substituteElem.css(sticky.$elem.css(['width', 'height', 'position']));
        sticky.$elem.after(sticky.$substituteElem);
      }

      sticky.$elem.css(scrollStyle);
    } else {
      if (sticky.$substituteElem.parent().length > 0) {
        sticky.$substituteElem.remove();
      }

      sticky.$elem.css(sticky.initialStyle);
      if (sticky.autoSize) {
        sticky.verticalStyle.width = sticky.horizontalStyle.width = sticky.$elem.outerWidth();
        sticky.verticalStyle.height = sticky.horizontalStyle.height = sticky.$elem.outerHeight();
      }
    }
  }

  var $window = $(window);
  var stickies = [];

  var defaults = {};

  var methods = {
    add: function (options) {
      var
        $this = $(this),

        defaultOptions = {
          autoSize: true,
          verticalStyle: {
            top: 0,
            left: function () { $window.scrollLeft() },
            width: $this.outerWidth()
          },
          horizontalStyle: {
            top: function () { $window.scrollTop() },
            left: 0,
            height: $this.outerHeight()
          }
        },

        readonlyOptions = {
          $elem: $this,
          $substituteElem: $(document.createElement('div')),
          initialPosition: {
            top: $this.position().top,
            left: $this.position().left
          },
          initialStyle: {
            position: this.style.position
          },
          initialVerticalStyle: {
            top: this.style.top,
            height: this.style.height
          },
          initialHorizontalStyle: {
            left: this.style.left,
            width: this.style.width
          }
        },

        sticky = $.extend(defaultOptions, options, readonlyOptions);

      stickies.push(sticky);

      checkStickyPosition(sticky);
    },

    remove: function () {
      var elem = this;
      stickies = $.grep(stickies, function (sticky, i) {
        if (sticky.$elem[0] === elem) {
          sticky.$elem.css(sticky.initialStyle);
          return false;
        } else {
          return true;
        }
      });

    }
  };

  $window.on('scroll resize', function (e) {
    $.each(stickies, function (index, sticky) {
      checkStickyPosition(sticky);
    });
  });

  $.fn.sticky = function () {
    var method, args, options = {};

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
