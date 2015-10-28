import SensorFeed from '../../index.js';
import mapValue from './middleware/mapValue.js';
import socketSend from './middleware/socketSend.js';
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

const logger = next => res => {
  console.log(res);
  let result = next(res);
  return result;
};

app.listen(8999);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

let board = new SensorFeed('/dev/ttyACM0');
io.on('connection', function (socket) {
  board.use({
    name: 'temp',
    pin: 0,
    rate: 1000,
    middleware: [
      mapValue(200, 900, 60, 100),
      logger, socketSend(socket)
    ]
  });
  board.use({
    name: 'water',
    pin: 0,
    rate: 1000,
    middleware: [
      mapValue(200, 900, 60, 100),
      logger, socketSend(socket)
    ]
  });
  board.use({
    name: 'light',
    pin: 0,
    rate: 1000,
    middleware: [
      mapValue(200, 900, 60, 100),
      logger, socketSend(socket)
    ]
  });
  board.listen();
})
