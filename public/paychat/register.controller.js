var app = angular.module('paychat');

app.controller('paychatController', paychat);

paychat.$inject = ['$http'];

function paychat($http) {
  var vm = this;
  activate();

  function activate() {
    register();
  }

  vm.loggedin = true;


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
    })
  }
}
