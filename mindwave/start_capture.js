var Mindwave = require('mindwave2');
var mw = new Mindwave();
var fs = require('fs');
var csvWriter = require('csv-write-stream');
const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});
var calc_attention;
var raw_attention;
var beta;

function heartbeat() {
    this.isAlive = true;
}

var wsconnection;
var writer = csvWriter({headers: ["timestamp", "attention", "betaToAlpha", "beta"]});
writer.pipe(fs.createWriteStream('train-devin-2.csv'));

wss.on('connection', function connection(ws) {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    wsconnection = ws
});

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping('', false, true);
    });
}, 30000);
mw.on('eeg', function (eeg) {
    let ms_now = new Date();
    beta = eeg.loBeta;
    if (beta !=0 && eeg.loAlpha != 0) {
        raw_attention = eeg.loBeta / eeg.loAlpha;
    }
    console.log('eeg', raw_attention, calc_attention, beta);

    writer.write([ms_now, calc_attention, raw_attention, beta]);
    if (wsconnection) {
        console.log('sending raw data..');
        wsconnection.send(JSON.stringify({
            'attention_raw': raw_attention,
            'beta': beta,
            'attention': calc_attention,
            'timestamp': ms_now
        }), function (error) {
            // Do something in here here to clean things up (or don't do anything at all)
        });
    }
});

// mw.on('signal', function(signal){
//     console.log('signal', signal);
// });

mw.on('attention', function (attention) {
    let ms_now = new Date()
    if (attention != undefined) {
        calc_attention = attention;

        writer.write([ms_now, calc_attention, raw_attention, beta]);
        if (wsconnection) {
            console.log('sending ..');
            wsconnection.send(JSON.stringify({
                'attention_raw': raw_attention,
                'beta': beta,
                'attention': calc_attention,
                'timestamp': ms_now
            }), function (error) {
                // Do something in here here to clean things up (or don't do anything at all)
            });
            //wsconnection.send(JSON.stringify({'attention': attention}))
        }
        console.log('attention', attention);
    }
});

// mw.on('meditation', function(meditation){
//     console.log('meditation', meditation);
// });
//
// mw.on('blink', function(blink){
// //     console.log('blink', blink);
// });
//
// mw.on('wave', function(wave){
//     console.log('wave', wave);
// });

// writeStream = fs.createWriteStream('data/temp.txt');
writer.on('finish', () => {
    writer.end();
    console.log('wrote all data to file');
});
mw.connect('/dev/cu.MindWaveMobile-DevA');