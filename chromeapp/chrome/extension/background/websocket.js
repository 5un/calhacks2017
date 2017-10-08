var wsPorts = [];
var mindwaveState = {
  connected: false
};
var socket = new WebSocket('wss://4e1d9385.ngrok.io');
// var socket = new WebSocket('ws://localhost:8080');

socket.onopen = (event) => {
  console.log('socket open');
  mindwaveState.connected = true;
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  for (var i in wsPorts) {
    var wsPort = wsPorts[i];
    wsPort.postMessage({ ...data, event: 'sensorData' });
  }
};

chrome.runtime.onConnect.addListener(function(port) {
  // console.assert(port.name == "knockknock");
  port.postMessage({ event: 'connectionState', connected: mindwaveState.connected });

  wsPorts.push(port);
  port.onDisconnect.addListener(function (sender) {
    var portIndex = -1;
    for(var i = 0; i < wsPorts.length; i++) {
      if(sender == wsPorts[i]) {
        portIndex = i;
      }
    }

    if(portIndex > -1) {
      wsPorts.splice(portIndex);
    }
    //TODO: remove itself from port list
  });
  // port.onMessage.addListener(function(msg) {
  //   if (msg.joke == "Knock knock")
  //     port.postMessage({question: "Who's there?"});
  //   else if (msg.answer == "Madame")
  //     port.postMessage({question: "Madame who?"});
  //   else if (msg.answer == "Madame... Bovary")
  //     port.postMessage({question: "I don't get it."});
  // });
});