$(function () {
    'use strict';

    var handler = function (event) {
        var text = $(this).attr('title') || '';

        var shouldShow = function ($el) {
	    return !($el.hasClass.call('show-tip', this));
        };

        return _.partial(function (e) {
            $(this.className + '::before').css('content', text);
            $(this).toggleClass('show-tip', shouldShow($(this)));
        }, _);
    };

    $('.help').on('mousein', handler);
    $('.help').on('mouseout', handler);
});











