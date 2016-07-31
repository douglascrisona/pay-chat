var express = require('express')
var invoices = express.Router()
var MongoClient = require('mongodb').MongoClient

var jsonParser = require('body-parser').json();

invoices.use(jsonParser);
var url = 'mongodb://localhost:27017/invoices'

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
  if(err) {
    console.log('Not Connected')
  } else {
    console.log('Connected correctly to server')
  }
  var invoices = db.collection('invoices')
  invoices
    .insertMany([
      invoice
    ],
    function(err, result) {
      db.close()
    }
  )
  });
  res.send();
});

invoices.get('/:issuer', function(req, res) {

  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
      console.log('Connected correctly to server')
    }
    var invoices = db.collection('invoices');
    invoices
      .find({poster: req.params.issuer})
      .toArray(function(err, docs) {
        res.send(docs);
        db.close();
      });
  });
});

invoices.get('/myinvoices/:name', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
      console.log('Connected correctly to server')
    }
    var invoices = db.collection('invoices');
    invoices
      .find({recipient: req.params.name})
      .toArray(function(err, docs) {
        res.send(docs);
        db.close();
      });
  });
});

invoices.put('/:id/:status', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('Not Connected')
    } else {
      console.log('Connected correctly to server')
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
      console.log('Connected correctly to server')
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
