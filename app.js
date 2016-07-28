var express = require('express');
var app = express();

var users = require('./routes/users.js');
app.use('/users', users);


app.listen(8080)
