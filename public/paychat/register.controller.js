var app = angular.module('paychat');

app.controller('paychatController', paychat);

paychat.$inject = ['$http'];

function paychat($http) {
  var vm = this;
  activate();

  function activate() {
    register();
  }
  vm.message = 'Stuff you have to do:'

  function register($scope) {

  }

  vm.newUser = function(item) {
    console.log(item)
    var user = item
    var add = $http.post('http://localhost:8080/users/' + user.name + '/' + user.password + '/' + user.email + '/' + user.phone)
  }


}

/**
var app = angular.module('pay');

app.controller('payController', pay);

payChat.$inject = ['$http'];

function register() {
  var vm = this;
  activate();

  function activate() {
    addUser();
  }

  vm.addUser = function(user) {
    console.log('New User')
  //  var user = {}
  //  user.name =
  //  var add = $http.post('http://localhost:8080/users/') + user.name + '/' + user.password + '/' + user.email + '/' + user.number
  }

}
**/
