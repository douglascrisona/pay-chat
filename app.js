var express = require('express');
var app = express();

var users = require('./routes/users.js');
app.use('/users', users);

app.get('/public/app.js', function(req, res) {
  res.sendFile(__dirname + '/public/app.js')
});

app.get('/public/paychat/register.controller.js', function(req, res) {
  res.sendFile(__dirname + '/public/paychat/register.controller.js')
});

app.use(express.static('./public'))

app.listen(8080)
