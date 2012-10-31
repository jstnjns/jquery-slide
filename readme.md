jQuery Slide
============

The Slider plugin was developed out of the shear need for a slider that is more intuitive to the CSS that is being applied to it. In a project I had for a client, not many other sliders were adapting well with the styling that I needed to apply to it.

Documentation
-------------

For the basic implementation, create an element (ie. UL or DIV), and child elements (ie. LI or DIV). NOTE: In the demos there are wrapper DIVs that are only used to style each slider separately.

```html
<ul>
  <li>Frame 1</li>
  <li>Frame 2</li>
  <li>Frame 3</li>
</ul>
```

or

```html	
<div>
  <div>Frame 1</div>
  <div>Frame 2</div>
  <div>Frame 3</div>
</div>
```

or even

```html
<div>
  <img alt="" />
  <img alt="" />
  <img alt="" />
</div>
```

### Implementation

To add a Slider very few lines of code are actually need. Load the jQuery library, be sure to have a simple parent > children structure, and apply the plug-in as follows:

```js
$(function() {
  $('ul').slider();
});
```

### Settings

If you wanted to add some settings to further customize your Slider, following are the settings, their defaults, as well as a brief explanation.

```js
$(function() {
  $('ul').slider({
    transition : 'slide',
    easing : 'swing',
    direction : 'horizontal',
    speed : 500,
    auto : false,
    interval : 2000,
    hoverPause : true,
    navigation : true,
    buttons : true,
    prevText  : 'Previous',
    nextText : 'Next',
    loop  : true
  });
});
```

`transition`: You can choose to have it ‘slide‘, ‘fade‘ or just ‘cut‘ between slides. Defaults to ‘slide‘.

`easing`: Whether you want to use jQuery’s ‘swing‘ or ‘linear‘, or you can add other easing options available with the Easing plugin. Defaults to ‘swing‘.

`direction`: Allows you to choose between sliding the panes in a ‘horizontal‘ or ‘vertical‘ fashion. Defaults to ‘horizontal‘.

`speed`: The duration of the transition (in milliseconds).  Defaults to 500.

`auto`: If set to TRUE, the slider will auto-advance. Defaults to FALSE.

`interval`: The time in milliseconds between each animation, if Auto is set to TRUE.

`hoverPause`: When the auto-advance is on, hovering will cause auto-advance to pause until the mouse is no longer hovering.  Defaults to TRUE.

`navigation`: Creates a navigation list for the slider. By default, each ‘tab’ has the frame number in which it will transition to on click. If a frame has a title, that will also be appended to the number (there are some CSS hooks to better style these. If set to FALSE, no navigation will display. Defaults to TRUE.

`buttons`: If set to FALSE, no buttons will display. If so, it is then recomended that Auto is set to TRUE. Defaults to TRUE.

`prevText`: Change the text on the Previous button.  Defaults to ‘Previous‘.

`nextText`: Change the text on the Next button.  Defaults to ‘Next‘.

`loop`: If set to true, a transition to the next slide while being on the last slide will trigger going back to the beginning, and vice-versa.  Defaults to TRUE.

### CSS

There are a few changes to the DOM that Slider makes. It uses a very basic naming convention. To modify the CSS, there are a few hooks that will make coding much easier (the classes in parenthesis are conditional).

```css
.slider-wrapper {}

  .slider-control-prev[.disabled] {}

  .slider-control-next[.disabled] {}

  .slider-control-navigation {}

    .slider-control-navigation-tab[.current] {}

.slider-boundary {}

  .slider-container {}

    .slider-slide {}
```