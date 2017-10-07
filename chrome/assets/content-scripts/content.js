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

  var count = 'ping'
  setInterval(function() {

    $('h1').css('font-size', fontSize + 'px');
  }, 1000);
  
});