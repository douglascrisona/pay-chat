var express = require('express')
var users = express.Router()
var MongoClient = require('mongodb').MongoClient
var api_key = 'key-9cc96855af2f852e677519fe4d013b54';
var domain = 'sandbox6d2d038266bc424e9202c3fe0eba35ad.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var url = 'mongodb://localhost:27017/users'


users.post('/:name/:password/:email/:number', function(req, res) {
  var newUser = {}
  newUser.name = req.params.name;
  newUser.password = req.params.password;
  newUser.email = req.params.email;
  newUser.number = req.params.number;

  MongoClient.connect(url, function(err, db) {
  if(err) {
    console.log('Not Connected')
  } else {
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

  var data = {
    from: 'PayChat <paychat@paychat.com>',
    to: newUser.email,
    subject: 'Welcome ' + newUser.name + '!',
    text: 'Thanks for signing up, you are now a member of PayChat.  Get started by adding recipients and sending some invoices!',
    html: '<body style="background-color:gray;"><h3 style="color:blue;">Thanks for signing up!</h3><h4>You are now a member of paychat.  Get started by adding recipients and sending some invoices!</h4><br><button>Explore</button></body>'
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

  res.send();
});

users.get('/:name', function(req, res) {
  var user = {};
  user.name = req.params.name

  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
    }
    var users = db.collection('users');
    users
      .find({name: user.name})
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

users.delete('/all', function(req, res) {

  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
    }
    var users = db.collection('users');
    users
      .drop()
  });
  res.send();
});



module.exports = users
