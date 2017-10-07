$(document).ready(function() {
  var count = 'ping'
  setInterval(function() {
    if(count === 'ping') {
      $('h1').css('font-size', '20px');
      count = 'pong';
    } else if(count === 'pong') {
      $('h1').css('font-size', '80px');
      count = 'ping';
    }
  }, 1000);
  
});