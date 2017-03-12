;(function($) {
  'use strict';

  var OnoffCanvas = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, OnoffCanvas.DEFAULTS, options);
    this.$trigger = $('[data-toggle="onoffcanvas"][href="#' + element.id + '"],' + '[data-toggle="onoffcanvas"][data-target="#' + element.id + '"]');

    if (this.options.parent) {
      this.$parent = this.getParent();
    } else {
      this.addAriaCollapsedClass(this.$element, this.$trigger);
    }

    if (this.options.toggle) {
      // this.toggle();
    }
  };

  OnoffCanvas.DEFAULTS = {
    toggle: true
  };

  OnoffCanvas.prototype.show = function() {
    var openClass = 'is-open';

    if (this.$element.hasClass(openClass)) {
      return;
    }

    this.$element.addClass(openClass).attr('aria-expanded', true);

    this.$trigger.attr('aria-expanded', true);

  };

  OnoffCanvas.prototype.hide = function() {
    var openClass = 'is-open';

    if (!this.$element.hasClass(openClass)) {
      return;
    }

    this.$element.removeClass(openClass).attr('aria-expanded', false);

    this.$trigger.attr('aria-expanded', false);

  };

  OnoffCanvas.prototype.toggle = function() {
    var openClass = 'is-open';
    this[this.$element.hasClass(openClass)
        ? 'hide'
        : 'show']();
  };

  OnoffCanvas.prototype.getParent = function() {
    return $(this.options.parent)
    .find('[data-toggle="onoffcanvas"][data-parent="' + this.options.parent + '"]')
    .each($.proxy(function(i, element) {
      var $element = $(element);
      this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
    }, this)).end();
  };

  OnoffCanvas.prototype.addAriaCollapsedClass = function($element, $trigger) {
    var openClass = 'is-open';
    var isOpen = $element.hasClass(openClass);

    $trigger.attr('aria-expanded', !isOpen);
    $element.toggleClass(openClass, !isOpen).attr('aria-expanded', !isOpen);
  };

  function getTargetFromTrigger($trigger) {
    var href;
    var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');

    return $(target);
  }

  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('onoffcanvas');
      var options = $.extend({}, OnoffCanvas.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data && options.toggle && /show|hide/.test(option)) {
        options.toggle = false;
      }
      if (!data) {
        $this.data('onoffcanvas', (data = new OnoffCanvas(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  }

  var old = $.fn.onoffcanvas;

  $.fn.onoffcanvas = Plugin;
  $.fn.onoffcanvas.Constructor = OnoffCanvas;

  // CANVAS NO CONFLICT
  // ====================

  $.fn.onoffcanvas.noConflict = function() {
    $.fn.onoffcanvas = old;
    return this;
  };

  $(document).on('click.onoffcanvas.data-api', '[data-toggle="onoffcanvas"]', function(e) {
    var $this = $(this);

    if (!$this.attr('data-target')) {
      e.preventDefault();
    }

    var $target = getTargetFromTrigger($this);
    var data = $target.data('onoffcanvas');
    console.log(data);
    var option = data
      ? 'toggle'
      : $this.data();

    Plugin.call($target, option);
  });
})(jQuery);