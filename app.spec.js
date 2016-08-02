var request = require('request');
var chai = require('chai');
var assert = chai.assert;

describe('New Users', function() {
  describe('Create', function() {
    it('Expects new user data', function(done) {
      request({url: 'http://localhost:8080/users/', method: 'POST'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done()
      });
    });
    it('Creates a new user', function(done) {
      request({url: 'http://localhost:8080/users/Doug/1234/DougCrisona@gmail.com/7189265123', method: 'POST'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done()
      });
    });
    it('Expects expecets a username for reference', function(done) {
      request({url: 'http://localhost:8080/login/', method: 'POST'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done();
      });
    })
    it('Creates a new sessionID', function(done) {
      request({url: 'http://localhost:8080/login/Doug/', method: 'POST'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done();
      });
    });
    it('Expects a recipient', function(done) {
      request({url: 'http://localhost:8080/recipients/', method: 'POST'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done();
      });
    });
    it('Creates a recipient', function(done) {
      request({url: 'http://localhost:8080/recipients/Julio/Julio@julo.com/555-555-5555', method: 'POST'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done();
      });
    });
    it('Expects invoice data', function(done) {
      request({url: 'http://localhost:8080/invoices/', method: 'POST'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done()
      });
    });
    it('Creates an invoice', function(done) {
      request({url: 'http://localhost:8080/invoices/Doug/25/Consulting/5/100/500/Jose', method: 'POST'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done()
      });
    });
  });
  describe('Read', function() {
    it('Expects a username', function(done) {
      request({url: 'http://localhost:8080/users/', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done();
      });
    });
    it('Retrieves a user', function(done) {
      request({url: 'http://localhost:8080/users/Doug', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done();
      });
    });
    it('Expects login information', function(done) {
      request({url: 'http://localhost:8080/login/', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done();
      });
    })
    it('Logs a user in', function(done) {
      request({url: 'http://localhost:8080/login/Doug/1234', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done();
      });
    });
    it('Expects expecets sessions', function(done) {
      request({url: 'http://localhost:8080/login/', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done();
      });
    })
    it('Creates a new sessionID', function(done) {
      request({url: 'http://localhost:8080/login/session/', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done();
      });
    });
    it('Expects recipients', function(done) {
      request({url: 'http://localhost:8080/sessions', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done();
      });
    });
    it('Retrieves a recipient list', function(done) {
      request({url: 'http://localhost:8080/recipients/', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done();
      });
    });
    it('Expects a recipient', function(done) {
      request({url: 'http://localhost:8080/recipients/user/Doug', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done();
      });
    });
    it('Retrieves a recipient', function(done) {
      request({url: 'http://localhost:8080/recipients/user/Doug/Julio', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done();
      });
    });
    it('Expects the invoice issuer', function(done) {
      request({url: 'http://localhost:8080/invoices/', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done()
      });
    });
    it('Retrieves all invoices of an issuer', function(done) {
      request({url: 'http://localhost:8080/invoices/Doug/', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done()
      });
    });
    it('Expects the invoice recipient', function(done) {
      request({url: 'http://localhost:8080/invoices/', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done()
      });
    });
    it('Retrieves all invoices of a recipient', function(done) {
      request({url: 'http://localhost:8080/invoices/Jose/', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done()
      });
    });
  });
  describe('Update', function() {
    it('Expects the invoice id', function(done) {
      request({url: 'http://localhost:8080/invoices/', method: 'PUT'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done()
      });
    });
    it('Updates the invoice status', function(done) {
      request({url: 'http://localhost:8080/invoices/Jose/', method: 'GET'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done()
      });
    });
  });
  describe('Delete', function() {
    it('Expects a username', function(done) {
      request({url: 'http://localhost:8080/users/', method: 'DELETE'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done();
      });
    });
    it('Deletes a user', function(done) {
      request({url: 'http://localhost:8080/users/Doug', method: 'DELETE'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done();
      });
    });
    it('Expects an invoice id', function(done) {
      request({url: 'http://localhost:8080/invoices/', method: 'DELETE'},
      function(error, response) {
        assert.equal(response.statusCode, 404)
        done();
      });
    });
    it('Deletes an invoice by id', function(done) {
      request({url: 'http://localhost:8080/invoices/25', method: 'DELETE'},
      function(error, response) {
        assert.equal(response.statusCode, 200)
        done();
      });
    });
  });
});
