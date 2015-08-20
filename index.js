// Socket.io brigde from html interface and irc.
var strftime = require('strftime');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var irc = require('irc');

var client = new irc.Client('irc.stealth.net', 'jamobottestionpasmullapitkanick', {
    channels: ['#jamotestaa'],
    userName: 'moocbot',
    realName: 'MOOC.fi irc bridge',
    showErrors: false,
    autoRejoin: false
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + JSON.stringify(msg));
    msg.timestamp = strftime('%H:%M');
    console.log('message2: ' + JSON.stringify(msg));
    socket.emit('chat messages', msg);
    try {
      client.say('#jamotestaa', msg.from + ': ' + msg.message);
    } catch (err) {
      console.log(err);
    }
  });
  socket.on('error', function(err) {
    console.log(err);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});



client.addListener('error', function(message) {
  console.log('error: ', message);
});

client.addListener('message', function(from, to, message) {
  console.log(from + ':'+ ' ' + to + ' ' + message);
  console.log(JSON.stringify(message));
  var timestamp = strftime('%H:%M');
  io.emit('chat messages', {timestamp: timestamp, from: from, to: to, message: message});
});
