/* global $ */
$(document).ready(function() {
  // var socket = new WebSocket("wss://246b33f7.ngrok.io");
  // var fontSize = 10;

  // socket.onopen = function (event) {
  //   console.log('socket open');
  // };

  // socket.onmessage = function (event) {
  //   console.log(event);
  //   var data = JSON.parse(event.data);
  //   console.log(data);
  //   fontSize = 30 + (data.time % 10);
  // }

  // setInterval(function() {
  //   $('h1').css('font-size', fontSize + 'px');
  // }, 1000);

  var saveOriginalStyle = function($el) {
    var attributesToSave = ['font-size', 'letter-spacing', 'line-height'];
    var originalStyle = {}
    $.each(attributesToSave, function(index, attribute) {
      originalStyle[attribute] = $el.css(attribute);
    });
    $el.data('original-style', originalStyle);
  }

  var restoreOriginalStyle = function($el) {
    var attributesToRestore = ['font-size', 'letter-spacing', 'line-height'];
    var originalStyle = $el.data('original-style');
    $.each(attributesToRestore, function(index, attribute) {
      $el.css(attribute, originalStyle[attribute]);
    });
  }

  var modifyTextElement = function($el) {
    // const origFontSize = parseInt($el.css('font-size'));
    // $el.css('font-size', (origFontSize * (1.0 + Math.random(1)) + 'px !important');
    
    // $el.css('background-color', '#eeeeee');
    // // Modify the elem only once
    // if(!$el.data('original-style')) {
    //   saveOriginalStyle($el);

    //   $el.css('letter-spacing', '2px');
    //   // $el.css('line-height', '120%');
    //   $el.text($el.text().replace(/\s/g, '  '));

    // }


  }

  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    console.log('[scroll] ' + scroll);
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    var range = document.caretRangeFromPoint(centerX, centerY); // screen coordinates of upper-left corner of a scolled area (in this case screen itself)
    var element = range.startContainer.parentNode;
    modifyTextElement($(element));
  });
});