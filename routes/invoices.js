var express = require('express')
var invoices = express.Router()
var MongoClient = require('mongodb').MongoClient
var cookieParser = require('cookie-parser')();
var jsonParser = require('body-parser').json();
var api_key = 'key-9cc96855af2f852e677519fe4d013b54';
var domain = 'sandbox6d2d038266bc424e9202c3fe0eba35ad.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var url = 'mongodb://localhost:27017/users'

invoices.use(cookieParser);
invoices.use(jsonParser);

invoices.post('/:poster/:id/:details/:qty/:cost/:total/:recipient', function(req, res) {
  var invoice = {}
  invoice.poster = req.params.poster;
  invoice.id = req.params.id;
  invoice.details = req.params.details;
  invoice.qty = req.params.qty;
  invoice.cost = req.params.cost;
  invoice.total = req.params.total;
  invoice.recipient = req.params.recipient;

  MongoClient.connect(url, function(err, db) {
  var users = db.collection('users')
    users.update({name: req.params.recipient},
        {$push: {invoices: invoice} },
      function(err, result) {
        db.close()
      }
    )
    users.find({name: req.params.recipient}).toArray(function(err, docs) {
      docs.forEach(function(info) {
        console.log(info.email)
        var data = {
          from: 'PayChat <paychat@paychat.com>',
          to: info.email,
          subject: 'Hi ' + info.name + ', you have a new invoice!',
          text: 'Hi ' + info.name + '! You have a new invoice from: ' + invoice.poster + ', login now to check it out.'
        };
        mailgun.messages().send(data, function (error, body) {});

      })
    })
  });
  res.send();
});


invoices.get('/myinvoices/:name', function(req, res) {
  MongoClient.connect(url, function(err, db) {
  if(err) {
    console.log('Not Connected')
  } else {

  }
  var users = db.collection('users')
    users
    .find().forEach(function(item) {
      if(item.name == req.params.name) {
        res.send(item.invoices)
      }
    });
      db.close()
  });
});


invoices.put('/:id/:status', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
    }
    var invoices = db.collection('invoices');
    invoices
      .update({id: req.params.id},
      {$set: {status: req.params.status}},
    function(err, result) {
      db.close()
    })
  });
  res.send();
});


invoices.delete('/:id', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
    }
    var invoices = db.collection('invoices');
    invoices
    .deleteOne(
      {id: req.params.id},
      function(err, result) {
        db.close()
      }
    )
  });
  res.send();
});


module.exports = invoices;
