var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var usernames = {}
var userids = []

io.on('connection', function (socket) {
  socket.on('adduser', function(username) {
    socket.username = username
    usernames[username] = username;
    console.log(usernames)
    socket.join('room2')
    socket.emit('updatechat', username)
    socket.on('chat message', function(msg){
      io.emit('chat message', msg, socket.username);
      });
  })
});


var users = require('./routes/users.js');
app.use('/users', users);

var recipients = require('./routes/recipients.js');
app.use('/recipients', recipients)

var invoices = require('./routes/invoices.js');
app.use('/invoices', invoices);

var login = require('./routes/login.js');
app.use('/login', login)

app.get('/public/app.js', function(req, res) {
  res.sendFile(__dirname + '/public/app.js')
});

app.get('/public/paychat/register.controller.js', function(req, res) {
  res.sendFile(__dirname + '/public/paychat/register.controller.js')
});

app.get('/public/paychat/recipients.controller.js', function(req, res) {
  res.sendFile(__dirname + '/public/paychat/recipients.controller.js')
})

app.get('/bower_components/angular-route/angular-route.js', function(req, res) {
  res.sendFile(__dirname + '/bower_components/angular-route/angular-route.js')
});

app.get('/public/new-invoice/invoice.controller.js', function(req, res) {
  res.sendFile(__dirname + '/public/new-invoice/invoice.controller.js')
});

app.get('/new-invoice/invoice/invoice.view.html', function(req, res) {
  res.sendFile(__dirname + '/new-invoice/invoice/invoice.view.html')
})

app.get('/public/view-invoice/view-invoices.controller.js', function(req, res) {
  res.sendFile(__dirname + '/public/view-invoice/view-invoices.controller.js')
});

app.get('/public/view-invoice/view-invoices.view.html', function(req, res) {
  res.sendFile(__dirname + '/public/view-invoice/view-invoices.view.html')
});

app.get('/public/recipients/recipients.controller.js', function(req, res) {
  res.sendFile(__dirname + '/public/recipients/recipients.controller.js')
});

app.get('/public/recipients/recipients.view.html', function(req, res) {
  res.sendFile(__dirname + '/public/recipients/recipients.view.html')
});

app.get('/public/view-invoice/view-invoices.view.html', function(req, res) {
  res.sendFile(__dirname + '/public/view-invoice/view-invoices.view.html')
});

app.get('/node_modules/angular-cookies/angular-cookies.js', function(req, res) {
  res.sendFile(__dirname + '/node_modules/angular-cookies/angular-cookies.js')
})

app.use(express.static('./public'))






server.listen(8080)
