var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
io.set('log level', 0);
var request = require('request');
var levelup = require('levelup');
var db = levelup('./mydb');
var uuid = require('node-uuid');

app.configure(function() {
  app.use(express.bodyParser({ uploadDir: __dirname + '/uploads', keepExtensions: true}));
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get(/(?!\.)/, function(req, res) {
  res.sendfile('./public/index.html');
});

server.listen(3000);

var leaders = {};

io.sockets.on('connection', function (socket) {
  // insert search code here
  // server submit code here
  // server list code here
  // server vote code here
});
