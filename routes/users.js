var express = require('express')
var users = express.Router()

users.post('/:name/:password/:email/:number', function(req, res) {
  res.send();
});

users.get('/all', function(req, res) {
  res.send();
});

users.delete('/:name', function(req, res) {
  res.send();
});


module.exports = users
