var app = angular.module('paychat');

app.controller('paychatController', paychat);


paychat.$inject = ['$http'];

function paychat($http) {
  var vm = this;
  activate();

  function activate() {
    register();
  }

  function register($scope) {

  }

  vm.newUser = function(item) {
    var user = item
    var add = $http.post('http://localhost:8080/users/' + user.name + '/' + user.password + '/' + user.email + '/' + user.phone)
    add
  }


  vm.recipients = function() {
    var view = $http.get('http://localhost:8080/recipients/Doug/').then(function successCallback(response) {
      vm.contacts = response.data
      vm.showRecipients = true
      vm.showInvoices = false
      vm.showNewInvoice = false;
      vm.invoices = false;
    })
  }

  vm.addRecipient = function(name, email, phone) {
    var user = {}
    user.recipient = name;
    user.email = email;
    user.phone = phone;
    var add = $http.post('http://localhost:8080/recipients/Doug/' + user.recipient + '/' + user.email + '/' + user.phone)
    add
      .then(function() {
        vm.recipients()
      })
  }

  vm.createInvoice = function(invoice) {
    var create = $http.post('http://localhost:8080/invoices/' + invoice.name + '/' + invoice.id + '/' + invoice.details + '/' + invoice.qty + '/' + invoice.cost + '/' + invoice.total + '/' + invoice.recipient)
    create
  }


  vm.displayNewInvoice = function() {
    vm.showRecipients = false;
    vm.showInvoices = false
    vm.showNewInvoice = true;
    vm.invoices = false;
  }


  vm.viewInvoices = function() {
    var view = $http.get('http://localhost:8080/invoices/myinvoices/Juan').then(function successCallback(response) {
      vm.invoice = response.data

      vm.invoices = true;
      vm.showRecipients = false;
      vm.showNewInvoice = false;
      vm.showInvoices = false;
    });
  }

  vm.login = function(user) {
    var login = $http.get('http://localhost:8080/login/' + user.name + '/' + user.password )
    vm.name = user.name
    login
    .then(function() {
      vm.check(vm.name)
    }).then(function() {
      vm.valid()
    })
  }

  vm.check = function(user) {
    var check = $http.post('http://localhost:8080/login/' + user).then(function successCallback(response) {
    });
  }

  vm.valid = function() {
    vm.loggedin = true;
  }

  vm.getSession = function() {
    var session = $http.post('http://localhost:8080/login/session').then(function successCallback(response) {
      vm.sessionId = response.data
    });
  }
}
