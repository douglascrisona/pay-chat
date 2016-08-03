var app = angular.module('paychat');

app.controller('paychatController', paychat);

paychat.$inject = ['$http'];

function paychat($http) {
  var vm = this;


  vm.newUser = function(item) {
    var user = item
    var add = $http.post('http://localhost:8080/users/' + user.name + '/' + user.password + '/' + user.email + '/' + user.phone)
    add
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
