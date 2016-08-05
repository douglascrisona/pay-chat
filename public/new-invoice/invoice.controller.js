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

  vm.createInvoice = function(invoice) {

  console.log(invoice)
  var create = $http.post('http://localhost:8080/invoices/' + invoice.name + '/' + invoice.id + '/' + invoice.details + '/' + invoice.qty + '/' + invoice.cost + '/' + invoice.total + '/' + invoice.recipient)
  create
  }

}
