var app = angular.module('paychat');

app.controller('viewInvoiceController', paychat)
paychat.$inject = ['$http']

function paychat ($http) {
  var vm = this;

  vm.check = function() {
    var check = $http.get('http://localhost:8080/login/session').then(function successCallback(response) {
      check
      .then(function() {
        vm.name = response.data
        vm.viewMyInvoices(vm.name)
      })
    });
  }

  vm.check()

  vm.viewMyInvoices = function(name) {
    var view = $http.get('http://localhost:8080/invoices/myinvoices/' + name).then(function successCallback(response) {
      vm.invoice = response.data
    });
  }
}
