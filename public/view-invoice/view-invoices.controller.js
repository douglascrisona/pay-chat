var app = angular.module('paychat');

app.controller('viewInvoiceController', paychat)
paychat.$inject = ['$http', '$scope']

function paychat ($http, $scope) {

  var vm = this;

  vm.check = function() {
    var users;
    var launched = false;
    var check = $http.get('http://localhost:8080/login/session')
      .then(function successCallback(response) {
        vm.name = response.data
        vm.viewMyInvoices(vm.name)
        vm.convos = []

        var socket = io.connect('http://localhost:8080')
        socket.on('connect', function() {
          socket.emit('adduser', vm.name)
        });

        socket.on('updatechat', function(user) {
          vm.sendMessage = function(msg) {
            socket.emit('chat message', msg)
          }

          socket.on('chat message', function(msg, username) {
            $scope.$apply(function() {
              vm.convos.push({msg: msg, username: username})
            });
          });
        });
      });
  }

  vm.check()

  vm.viewMyInvoices = function(name) {
    var view = $http.get('http://localhost:8080/invoices/myinvoices/' + name).then(function successCallback(response) {
      vm.invoice = response.data
    });
  }

  vm.displayChat = function() {

    vm.chat = true;
  }
  $scope.$on('$destroy', function() {
    socket.emit('disconnect')
  })
}
