$(function () {
	'use strict';

	var shouldShowNav = function (n) {
		return n > 250;
	}
	return window.requestAnimationFrame(function () {
		$(document).on('scroll', function (e) {
			var topNum = $(window).scrollTop();
			return _.throttle($('nav').toggleClass('-down', shouldShowNav(topNum)), 100);
		});

		$('._top_').on('click', window, function () {
			$(event.view).scrollTop(0);
		});
		
	});
})

