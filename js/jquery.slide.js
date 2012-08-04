/**
 * This jQuery plugin creates an animated slider with the child elements as frames.

 slide
	create/modify/register required markup
		wrapper - simply wraps all elements, no functionality
		boundary - encloses all children elements, shows only a single frame
		container - holds all frames, distrubutes them in correct order/position
		frames
	create requested controls
		prev/next
		navigation
	execute transition
		slide
			easing
			direction
		fade
		cut
	modify controls when necessary
	set timer for automatic transition


 *
 * @author Justin Jones (justin(at)jstnjns(dot)com)
 * @version 1.4
 *
 * New features in 1.4
 *  - Added support for navigation (set to true by default, so you'll need
 *    to manually turn this off if not wanted and updating)
 *
 * New Features in 1.3:
 *  - Cleaned up codebase (check to see if the settings you are implimenting
 *    not deprecated or changed, as well as CSS [revamped a lot])
 *  - Changed buttons to anchor tags for better CSS flexibility
 *  - Added 'fade' and 'cut' transitions
 *
 * New Features in 1.2:
 *  - Easing
 *  - Multiple instances can now run on the same page
 *
 * New Features in 1.1:
 * 	- Vertical scrolling
 * 	- Buttons are optional
 * 	- Speed settings
 *
 */
(function($){
	$.fn.slide = function(settings) {

		$(this).each(function() {
			// ----------------------------------------------------------------|| Setting Vars ||
			var $this = $(this),
			$frames,
			$wrapper,
			$boundary,
			$container,
			$prev,
			$next,
			$navigation,
			boundaryWidth,
			boundaryHeight,
			frameWidth,
			frameHeight,
			frameCount,
			currentFrame = 1,
			auto,

			_init = function() {

				settings = $.extend({}, $.fn.slide.defaults, settings);

				$frames			= $this
									.children()
									.addClass('slide-slide');

				// Get values and dimensions necessary for more advanced structure
				frameCount		= 0;

				frameWidth		= 0;
				frameHeight		= 0;

				boundaryWidth	= 0;
				boundaryHeight	= 0;

				// Set up the basic physical structure of the slide
				$wrapper		= $this
									.wrap('<div />')
										.parent()
										.addClass('slide-wrapper');

				$boundary		= $this
									.wrap('<div />')
										.parent()
											.addClass('slide-boundary');

				$container		= $this
									.addClass('slide-container');

				if(settings.buttons) {
					$prev		= $('<a />')
									.addClass('slide-control-prev')
									.text(settings.prevText)
									.click(function(e){
										e.preventDefault();

										if(!$this.hasClass('disabled')) {
											_transition(currentFrame - 1);
										}
									 });

					$next		= $('<a />')
									.addClass('slide-control-next')
									.text(settings.nextText)
									.click(function(e){
										e.preventDefault();

										if(!$this.hasClass('disabled')) {
											_transition(currentFrame + 1);
										}
									});

					$prev.add($next)
						.attr('unselectable', 'on')
						.css({
							'-moz-user-select':'none',
							'-webkit-user-select':'none',
							'user-select':'none'
						})
						.each(function() {
							this.onselectstart = function() { return false; };
						});

					$wrapper
						.prepend($prev)
						.append($next);
				}

				if(settings.navigation) {
					$navigation = $('<ol />')
									.addClass('slide-control-navigation');

					$frames.each(function(i, frame) {
						var $tab = $('<li />')
										.addClass('slide-control-navigation-tab')
											.append('<span />').find('span')
												.addClass('number')
												.text(i + 1)
												.end()
										.click(function(e) {
											e.preventDefault();

											if((i+1) != currentFrame) {
												_transition(i+1);
											}
										});

						if(i == 0) {
							$tab
								.addClass('current');
						}

						if($(frame).attr('title')) {
							$('<span />')
								.addClass('title')
								.text($(frame).attr('title'))
								.appendTo($tab);
						}

						$navigation
							.append($tab);
					});

					$wrapper
						.append($navigation);
				}

				if(settings.seemlessLoop){
					var $newFrame = $frames.eq(0).clone();

					$newFrame.appendTo($container)
					$frames = $frames.add($newFrame);
				}

				frameCount = $frames.length;

				$frames.each(function() {
					if($(this).width() > frameWidth) frameWidth = $(this).width(); // Get widest frame's width
					if($(this).height() > frameHeight) frameHeight = $(this).height(); // Get tallest frame's height

					if($(this).outerWidth(true) > boundaryWidth) boundaryWidth = $(this).outerWidth(true); // Get widest frame's outer width
					if($(this).outerHeight(true) > boundaryHeight) boundaryHeight = $(this).outerHeight(true); // Get tallest frame's outer height
				});

				// Set dimensions on elements that need sizing
				$frames.css({
					'width'	: frameWidth,
					'height': frameHeight,
					'float'	: 'left'
				});

				if(settings.transition == 'slide') {
					if(settings.direction == 'horizontal') {
						$container.css({
							width	: boundaryWidth * frameCount,
							height	: boundaryHeight,
							overflow: 'hidden'
						});
					} else {
						$container.css({
							width	: boundaryWidth,
							height	: boundaryHeight * frameCount,
							overflow: 'hidden'
						});
					}
				} else {
					$container.css({
						position: 'relative',
						width	: boundaryWidth,
						height	: boundaryHeight
					});

					$frames
						.css({
							position: 'absolute',
							left	: 0,
							top		: 0
						})
						.hide();

					$frames.eq(0)
						.show();
				}

				$boundary.css({
					width	: boundaryWidth,
					height	: boundaryHeight,
					overflow: 'hidden'
				});

				//console.log($frames.length);

				if(settings.auto && $frames.length > 1) {
					_startTimer(settings.interval);

					if(settings.hoverPause) {
						$wrapper.hover(function() {
							_stopTimer();
						}, function() {
							_startTimer();
						});
					}
				}

			},

			// Transitions to frame
			_transition = function(toFrame) {

				// LOOPING
				// If out of bounds, send to the opposite side
				if(settings.loop) {
					if(toFrame > frameCount) {
						if(settings.seemlessLoop){
							$container.css('margin-left',0);
							_transition(2);
						}else{
							_transition(1);
						}
						return;
					} else if(toFrame <= 0) {
						_transition(frameCount);
						return;
					}

				// NON-LOOPING
				// If out of bounds, do nothing
				} else {
					if(toFrame > frameCount || toFrame <= 0) return;
				}

				switch(settings.transition) {
					case 'slide':
						var diff = toFrame - currentFrame;
						_slide(diff);
						break;

					case 'fade':
						_fade(toFrame);
						break;

					default:
						_cut(toFrame);
						break;
				}

				currentFrame = toFrame;

				/*
					TODO get the button disabling / enabling and looping to work
				*/
				if(!settings.loop && settings.buttons) {
					// Sets 'previous' button to disabled if on first frame
					if(currentFrame == 1) {
						$prev.addClass('disabled');
					} else {
						$prev.removeClass('disabled');
					}

					// Sets 'next' button to disabled if on last frame
					if(currentFrame == frameCount) {
						$next.addClass('disabled');
					} else {
						$next.removeClass('disabled');;
					}
				}

				if(settings.navigation) {
					$navigation
						.children()
							.removeClass('current')
							.eq(currentFrame - 1)
								.addClass('current');
				}

			},

			_slide = function(frames) {

				if(settings.direction == 'horizontal') {
					$this.stop().animate({
						marginLeft: (-1) * (currentFrame + frames - 1) * boundaryWidth + 'px'
					}, settings.speed, settings.easing);
				} else if(settings.direction == 'vertical') {
					$this.stop().animate({
						marginTop: (-1) * (currentFrame + frames - 1) * boundaryHeight + 'px'
					}, settings.speed, settings.easing);
				}

			},

			_fade = function(toFrame) {

				$frames.eq(toFrame - 1)
					.fadeIn(settings.speed);

				$frames.eq(currentFrame - 1)
					.fadeOut(settings.speed);

			},

			_cut = function(toFrame) {

				$frames.eq(toFrame - 1)
					.show();

				$frames.eq(currentFrame - 1)
					.hide();

			},

			_startTimer = function() {
				if (settings.auto && $frames.length > 1) {
					auto = setInterval(function() {
						_transition(currentFrame + 1);
					}, settings.interval);
				}
			},

			_stopTimer = function() {
				if(settings.auto !== false){
					clearInterval(auto);
				}
			};

			_init();
		});
	};

	$.fn.slide.defaults = {
		transition		: 'slide', // cut, fade
		easing			: 'swing', // linear
		direction		: 'horizontal', // for 'slide' style transition
		speed			: 500, // for 'slide' and 'fade' style transitions
		auto			: false,
		interval		: 2000, // pause between transitions if 'auto' is set to TRUE
		hoverPause		: true,
		navigation		: true,
		buttons			: true,
		prevText		: 'Previous',
		nextText		: 'Next',
		loop			: true,
		seemlessLoop	: false
	};
})(jQuery);