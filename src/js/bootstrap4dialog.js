/**
 * Bootstrap Modal for Bootstrap 4.*
 * 
 * @author GR <admin@admin.ge>, https://github.com/SUXUMI
 * @source https://github.com/SUXUMI/bootstrab4dialog
 * @description Bootstrap Modal for Bootstrap 4.*
 * @license MIT
 */

(function (root, factory) {
    "use strict";

    // https://github.com/umdjs/umd
    if (typeof module !== "undefined" && module.exports) {
        module.exports = factory(require("jquery"), require("bootstrap"));
    }
    else if (typeof define === "function" && define.amd) {
        define("bootstrap4dialog", ["jquery", "bootstrap"], function ($) {
            return factory($);
        });
    } else {
        root.Bootstrap4Dialog = factory(root.jQuery);
    }
})(this ? this : window, function ($) {
    /**
     * Set default global options
     * 
     * @param {} options 
     */
    var Bootstrap4Dialog = function (options) {
        $.extend(true, this.defaultOptions, options);
    };

    /**
     *  Constants
     */
    Bootstrap4Dialog.TYPE_PRIMARY = "primary";
    Bootstrap4Dialog.TYPE_SECONDARY = "secondary";
    Bootstrap4Dialog.TYPE_SUCCESS = "success";
    Bootstrap4Dialog.TYPE_DANGER = "danger";
    Bootstrap4Dialog.TYPE_WARNING = "warning";
    Bootstrap4Dialog.TYPE_INFO = "info";
    Bootstrap4Dialog.TYPE_LIGHT = "light";
    Bootstrap4Dialog.TYPE_DARK = "dark";

    Bootstrap4Dialog.SIZE_SMALL = "modal-sm";
    Bootstrap4Dialog.SIZE_MEDIUM = "";
    Bootstrap4Dialog.SIZE_LARGE = "modal-lg";
    Bootstrap4Dialog.SIZE_EXTRA_LARGE = "modal-xl";
    
    Bootstrap4Dialog.BACKDROP_YES = "true";
    Bootstrap4Dialog.BACKDROP_NO = "";
    Bootstrap4Dialog.BACKDROP_STATIC = "static";

    /**
     * Default options
     */
    Bootstrap4Dialog.defaultOptions = {
        title: '',
        message: '',
        type: Bootstrap4Dialog.TYPE_PRIMARY,
        size: Bootstrap4Dialog.SIZE_MEDIUM,
        keyboard: true,
        focus: true,
        scrollable: false, // modal-dialog-scrollable
        centered: false, // modal-dialog-centered
        backdrop: Bootstrap4Dialog.BACKDROP_YES,
        duration: 0, // SECONDS - how long the dialog should be displayed
        autodestroy: true,
        
        open: null,
        close: null,
        buttons: [],

        // draggable: false,
        // animate: true,
        // tabindex: -1,
    };
    
    /**
     * Prepares the dialog
     *
     * @param {type} options
     * @returns the created dialog instance
     */
    Bootstrap4Dialog.dialog = function(options) {
        var dialog;

        var _options = $.extend(false, this.defaultOptions, options);

        _options['show'] = false;

    	try {
    		if (!_options['title'] && !_options['message'] && (!_options['buttons'] || !_options['buttons'].length)) {
    			return false;
            }
            
    		var id = _options['id'] || 'modalWindow_' + uniqid();

    		var html =
    			'<div id="' + id + '" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'
    			 + '<div class="modal-dialog" role="document">'
    			     + '<div class="modal-content">';

    					if (_options['title']) {
    						html +=

    						  '<div class="modal-header rounded">'
    							+ '<h6 class="modal-title"></h6>'
    					     	+ '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
    					     	+ '<span aria-hidden="true">&times;</span>'
    					     	+ '</button>'
    				     	+ '</div>'
    					}

    					if (_options['message']) {
    						html +=

    				     	  '<div class="modal-body">'
    				        + '</div>'
    					}

    					if (_options['buttons'] && _options['buttons'].length) {
    						html +=
    				          '<div class="modal-footer text-center">'
    					        //+ '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
    					        //+ '<button type="button" class="btn btn-primary">Save changes</button>'
    				        + '</div>'
    					}

    			        + '</div>'
    		        + '</div>'
    	        + '</div>'
            ;
            
    		$('body').append( html );

    		var _modal_container = $('#' + id);
            
            // append title
    		if (_options['title'] && _options['title'].length) {
    			_modal_container.find('.modal-title').html( _options['title'] );
    		}

            // append message
    		if (_options['message'] && _options['message'].length) {
    			_modal_container.find('.modal-body').html( _options['message'] );
    		}

    		if (_options['title'] && !_options['message'] && (!_options['buttons'] || !_options['buttons'].length)) {
    			_modal_container.find('.modal-header').css({'border-bottom':'0px'});
    		}

    		if (!_options['title'] && !_options['message'] && _options['buttons'] && _options['buttons'].length) {
    			_modal_container.find('.modal-footer').css({'border-top':'0px'});
            }
            
    		if (_options['size'] && _options['size'].length) {
    			_modal_container.find('.modal-dialog').addClass(_options.size);
    		}
            
    		if (_options['centered']) {
    			_modal_container.find('.modal-dialog').addClass('modal-dialog-centered');
    		}
            
    		if (_options['scrollable']) {
    			_modal_container.find('.modal-dialog').addClass('modal-dialog-scrollable');
    		}

    		switch(true) {
    			case _options['type'] == 'primary':
    				_modal_container.find('.modal-header').addClass('bg-primary').find('.modal-title').addClass('text-white');
    				_modal_container.find('.modal-body').addClass('text-primary');
    				break;
    			case _options['type'] == 'secondary':
    				_modal_container.find('.modal-header').addClass('bg-secondary').find('.modal-title').addClass('text-white');
    				_modal_container.find('.modal-body').addClass('text-secondary');
    				break;
    			case _options['type'] == 'success':
    				_modal_container.find('.modal-header').addClass('bg-success').find('.modal-title').addClass('text-white');
    				_modal_container.find('.modal-body').addClass('text-success');
    				break;
                case _options['type'] == 'danger':
                    _modal_container.find('.modal-header').addClass('bg-danger').find('.modal-title').addClass('text-white');
                    _modal_container.find('.modal-body').addClass('text-danger');
                    break;
    			case _options['type'] == 'warning':
    				_modal_container.find('.modal-header').addClass('bg-warning');
    				_modal_container.find('.modal-body').addClass('text-warning');
    				break;
    			case _options['type'] == 'info':
    				_modal_container.find('.modal-header').addClass('bg-info').find('.modal-title').addClass('text-white');
    				_modal_container.find('.modal-body').addClass('text-info');
    				break;
                case _options['type'] == 'light':
                    _modal_container.find('.modal-header').addClass('bg-light').find('.modal-title').addClass('text-black');
                    _modal_container.find('.modal-body').addClass('text-black');
                    break;
    			case _options['type'] == 'dark':
    				_modal_container.find('.modal-header').addClass('bg-dark').find('.modal-title').addClass('text-white');
    				_modal_container.find('.modal-body').addClass('text-dark');
    				break;
    		}

    		dialog = _modal_container.modal(_options);

    		// try set buttons
    		try {
    			// fooder
    			var _footer = _modal_container.find('.modal-footer');

    			for(i in _options['buttons']) {
    				var _button = _options['buttons'][i];

    				// append the button
    				_footer.append('<button class="btn" />');

    				var _element_button = _footer.find('button').eq(i);

    				if (_button['id']) { _element_button.attr('id', _button['id']); }
    				if (_button['label']) { _element_button.html(_button['label']); }
    				if (_button['cssClass']) { _element_button.addClass(_button['cssClass']); }

    				// https://dzone.com/articles/why-does-javascript-loop-only-use-last-value
    				// https://stackoverflow.com/a/17750253/1565790
    				if (typeof(_button['action']) == 'function') {
    					(function(button, f, dialog) {
    						button.bind('click', function() { f(dialog, button); });
    					})(_element_button, _button['action'], dialog);
    				}
    			}
    		}
            catch(e) {console.log(e.message);}

            // set handlers
            if (typeof(_options['open']) == 'function') {
                dialog.on('shown.bs.modal', _options['open']);
            }

            if (typeof(_options['close']) == 'function') {
                dialog.on('hidden.bs.modal', _options['close']);
            }

            if (_options['autodestroy']) {
                dialog.on('hidden.bs.modal', function() { destroy(dialog) });
            }
            
            if (_options['duration']) {
                dialog.on('shown.bs.modal', function() {
                    setTimeout(function() {
                        dialog.modal('hide');
                    }, parseFloat(_options['duration']) * 1000);
                });
            }

            return dialog;
    	}
    	catch(e) {
    		console.warn(e.message);
    	}
    }

    /**
     * Displays prepared dialog
     *
     * @param {type} options
     * @returns the created dialog instance
     */
    Bootstrap4Dialog.show = function(options) {
        try {
            return this.dialog(options).modal('show');
        }
    	catch(e) {
    		console.warn(e.message);
    	}
    }

    /**
     * Removes dialog DOM instance
     *
     * @param object dialog
     */
    var destroy = function(dialog) {
        try {
            setTimeout(function() {
                dialog.remove();
            }, 200);
        }
    	catch(e) {
    		console.warn(e.message);
    	}
    };

    /**
     * Generates uniqid 
     * 
     * @source - https://github.com/makeable/uuid-v4.js/blob/master/uuid-v4.js
     */
    var uniqid = function () {
        var dec2hex = [];

        for (var i = 0; i <= 15; i++) {
            dec2hex[i] = i.toString(16);
        }

        var uuid = "";
        for (var i = 1; i <= 36; i++) {
            if (i === 9 || i === 14 || i === 19 || i === 24) {
                uuid += "-";
            } else if (i === 15) {
                uuid += 4;
            } else if (i === 20) {
                uuid += dec2hex[(Math.random() * 4) | (0 + 8)];
            } else {
                uuid += dec2hex[(Math.random() * 16) | 0];
            }
        }
        return uuid;
    };
    
    return Bootstrap4Dialog;
});
