var express = require('express')
var MongoClient = require('mongodb').MongoClient
var cookieParser = require('cookie-parser')();
var jsonParser = require('body-parser').json();
var login = express.Router();

login.use(cookieParser);
login.use(jsonParser);

var url = 'mongodb://localhost:27017/users'

var id = {
  id: function() {
    return Math.floor(Math.random() * 100000000)
  }
}

login.get('/:name/:password', function(req, res) {
    var name = req.body.name;
    var password = req.body.password;
    MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
    }
    var users = db.collection('users')
      users
      .find().forEach(function(item) {
        if((item.name == req.params.name) && (item.password == req.params.password)) {
          var tracking = id.id()
          console.log(tracking)
          res.cookie('trackingID', tracking)
          res.send(item)
        }
      });
      db.close()
    });
});

login.post('/:name', function(req, res) {
  MongoClient.connect(url, function(err, db) {
  if(err) {
    console.log('Not Connected')
  } else {
  }
  var users = db.collection('users')
  console.log(req.params.name)
  users
  .updateOne(
    {name: req.params.name},
    {$set: {sessionId: req.cookies.trackingID}},
    function(err, result) {
      db.close()
    }
  )
  });
  console.log(req.cookies.trackingID)
  res.send(req.cookies.trackingID)
})


login.get('/session', function(req, res) {
    MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
    }
    var users = db.collection('users')
      users
      .find().forEach(function(item) {
        if(item.sessionId == req.cookies.trackingID) {
          var tracking = id.id()
          res.send(item.name)
        }
      });
      db.close()
    });
});



module.exports = login
