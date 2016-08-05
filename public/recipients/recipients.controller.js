var app = angular.module('paychat');

app.controller('recipientsController', paychat)
paychat.$inject = ['$http']

function paychat ($http) {
  var vm = this;

  vm.recipients = function() {
    var view = $http.get('http://localhost:8080/recipients/').then(function successCallback(response) {
      vm.contacts = response.data
    })
  }

  vm.recipients()

  vm.addRecipient = function(name, email, phone) {
    var user = {}
    user.recipient = name;
    user.email = email;
    user.phone = phone;
    var add = $http.post('http://localhost:8080/recipients/' + user.recipient + '/' + user.email + '/' + user.phone)
    add
      .then(function() {
        vm.recipients()
      })
  }
}
