var app = angular.module('paychat');

app.controller('invoiceController', paychat)
paychat.$inject = ['$http']

function paychat ($http) {
  var vm = this;
  vm.message = 'Hello'
  activate();

  function activate() {
    createInvoice();
  }

  function createInvoice($scope) {

  }

  vm.createInvoice = function(invoice, recipient) {
  var create = $http.post('http://localhost:8080/invoices/' + vm.name + '/' + invoice.id + '/' + invoice.details + '/' + invoice.qty + '/' + invoice.cost + '/' + invoice.total + '/' + recipient)
  create
  }

  vm.chooseRecipients = function() {
    var view = $http.get('http://localhost:8080/recipients/').then(function successCallback(response) {
      vm.contacts = response.data
    })
  }
  vm.chooseRecipients()

  vm.check = function() {
    var check = $http.get('http://localhost:8080/login/session')
      .then(function successCallback(response) {
        vm.name = response.data
      });
  }
  vm.check()
}
