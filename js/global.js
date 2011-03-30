// JavaScript Document

$(function() {
	$('#plain ul').simpleslider();
	
	$('#dark ul').simpleslider({
		speed			: 300,
		easing			: 'swing'
	});
	
	$('#cautious ul').simpleslider({
		speed			: 1300,
		easing			: 'easeOutBounce',
		prevText		: 'PREV',
		nextText		: 'NEXT'
	});
	
	$('#forest div').simpleslider({
		speed			: 500,
		transition		: 'fade',
		auto			: true,
		navigation		: false
	});
	
	$('#count ol').simpleslider({
		transition		: 'cut',
		navigation		: false,
		prevText		: '-',
		nextText		: '+',
		loop			: false
	});
});