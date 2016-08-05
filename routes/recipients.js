var express = require('express')
var recipients = express.Router()
var MongoClient = require('mongodb').MongoClient
var jsonParser = require('body-parser').json();
var cookieParser = require('cookie-parser')();

recipients.use(cookieParser);

recipients.use(jsonParser);

var url = 'mongodb://localhost:27017/users'

recipients.post('/:recipient/:email/:phone', function(req, res) {
  var user = {}
  user.recipient = req.params.recipient;
  user.email = req.params.email;
  user.phone = req.params.phone;
  console.log(req.cookies.trackingID)

  MongoClient.connect(url, function(err, db) {
  if(err) {
    console.log('Not Connected')
  } else {
  }
  var users = db.collection('users')
  users
    .update({sessionId: req.cookies.trackingID},
      {$push: {recipients: user} },
    function(err, result) {
      db.close()
    }
  )
  });
  res.send();
});

recipients.get('/', function(req, res) {
  MongoClient.connect(url, function(err, db) {
  if(err) {
    console.log('Not Connected')
  } else {
  }
  var users = db.collection('users')
    users
    .find().forEach(function(item) {
      if(item.sessionId == req.cookies.trackingID) {
        res.send(item.recipients)
        console.log(item.recipients)
      }
    });
    db.close()
  });
});

recipients.get('/user/:name/:recipient', function(req, res) {
  MongoClient.connect(url, function(err, db) {
  if(err) {
    console.log('Not Connected')
  } else {
  }
  var users = db.collection('users')
    users
    .find().forEach(function(item) {
      if(item.name == req.params.name) {
        item.recipients.forEach(function(name) {
          if(req.params.recipient == name.recipient) {
            res.send(name)
          }
        });
      }
    });
    db.close()
  });
});

recipients.put('/:name/:recipient', function(req, res) {
  res.send();
})


recipients.delete('/:name/:recipient', function(req, res) {
  MongoClient.connect(url, function(err, db) {
  if(err) {
    console.log('Not Connected')
  } else {
  }
  var users = db.collection('users')
  users
    .update(
      {name: req.params.name},
      { $pull: { "recipients" : { recipient: req.params.recipient } }
    });
    db.close();
  });
  res.send();
});



module.exports = recipients;
