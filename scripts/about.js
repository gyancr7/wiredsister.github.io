$(function () {
	'use strict';

	var shouldShowNav = function (n) {
		return n > 250;
	}

	var shouldBeginSlothAnimation = function (height) {
		return height + $(window).height() > $(document).height() - 500;
	}

	return window.requestAnimationFrame(function () {
		$(document).on('scroll', function (e) {
			var topNum = $(window).scrollTop();

			_.throttle($('nav').toggleClass('-down', shouldShowNav(topNum)), 100);
			_.throttle($('footer').toggleClass('-bottom', shouldBeginSlothAnimation(topNum)), 100);
		});

		$('._top_').on('click', window, function () {
			$(event.view).scrollTop(0);
		});
		
	});
})

