var request = require('request');
var chai = require('chai');
var assert = chai.assert;

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
    request({url: 'http://localhost:8080/users/Doug', method: 'Delete'},
    function(error, response) {
      assert.equal(response.statusCode, 200)
      done();
    });
  });
});
