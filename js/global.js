// JavaScript Document

$(function() {
	$('#plain ul').slider();
	
	$('#dark ul').slider({
		speed			: 300,
		easing			: 'swing'
	});
	
	$('#cautious ul').slider({
		speed			: 1300,
		easing			: 'easeOutBounce',
		prevText		: 'PREV',
		nextText		: 'NEXT'
	});
	
	$('#forest div').slider({
		speed			: 500,
		transition		: 'fade',
		auto			: true,
		navigation		: false
	});
	
	$('#count ol').slider({
		transition		: 'cut',
		navigation		: false,
		prevText		: '-',
		nextText		: '+',
		loop			: false
	});
});