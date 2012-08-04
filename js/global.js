// JavaScript Document

$(function() {
	$('#plain ul').slide();

	$('#dark ul').slide({
		speed			: 300,
		easing			: 'swing'
	});

	$('#cautious ul').slide({
		speed			: 1300,
		easing			: 'easeOutBounce',
		prevText		: 'PREV',
		nextText		: 'NEXT'
	});

	$('#forest div').slide({
		speed			: 500,
		transition		: 'fade',
		auto			: true,
		navigation		: false
	});

	$('#count ol').slide({
		transition		: 'cut',
		navigation		: false,
		prevText		: '-',
		nextText		: '+',
		loop			: false
	});
});