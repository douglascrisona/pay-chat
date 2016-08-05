var app = angular.module('paychat', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/invoice',
      {
        templateUrl: '/new-invoice/invoice.view.html',
        controller: 'invoiceController',
        controllerAs: 'items'
      }
    )
    .when('/invoices',
      {
        templateUrl: '/view-invoice/view-invoices.view.html',
        controller: 'viewInvoiceController',
        controllerAs: 'invoices'
      }
    )
    .when('/recipients',
    {
      templateUrl: '/recipients/recipients.view.html',
      controller: 'recipientsController',
      controllerAs: 'recipients'
    }
    )
}]);
