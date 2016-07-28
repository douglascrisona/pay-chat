var express = require('express')
var users = express.Router()
var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/users'


users.post('/:name/:password/:email/:number', function(req, res) {
  console.log(newUser)
  var newUser = {}
  newUser.name = req.params.name;
  newUser.password = req.params.password;
  newUser.email = req.params.email;
  newUser.number = req.params.number;

  MongoClient.connect(url, function(err, db) {
  if(err) {
    console.log('Not Connected')
  } else {
    console.log('Connected correctly to server')
  }
  var users = db.collection('users')
  users
    .insertMany([
      newUser
    ],
    function(err, result) {
      db.close()
    }
  )
  });
  res.send();
});

users.get('/all', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
      console.log('Connected correctly to server')
    }
    var users = db.collection('users');
    users
      .find({})
      .toArray(function(err, docs) {
        res.send(docs);
        db.close();
      });
  });
});

users.delete('/:name', function(req, res) {
  var user = {}
  user.name = req.params.name;

  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
      console.log('Connected correctly to server')
    }
    var users = db.collection('users');
    users
    .deleteOne(
      {name: user.name},
      function(err, result) {
        db.close()
      }
    )
  });
  res.send();
});


module.exports = users
