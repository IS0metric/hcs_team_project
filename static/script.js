var app = angular.module('app', ['ngRoute']);

/** Routing Configuration
 *  Whenever a specified route is accessed, the HTML is loaded into the main
 *  view (located in the index page) and the controller loads the content
 */
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl : 'templates/checker.html',
        controller  : 'checker_controller'
    })
    .when('/success', {
        templateUrl : 'templates/success.html',
        controller  : 'success_controller'
    });
});

/** Main View Controller
 *  Maps the the app's main view, which includes the password checker
 */
app.controller('checker_controller', function($scope, $location) {
  /* Will handle the core of the visual representation, including the random
  characters and symbols, etc */
  $scope.test_message = "Welcome to the password checker";

  $scope.check_password = function() {
    // Will handle the core of the password checking and route to next page
    var password = $scope.password;
    console.log(password);
    $location.path("/success");
  }
})

/** Success Controller
 *  Maps to the success page
 */
app.controller('success_controller', function($scope, $location) {
  $scope.success_message = "Successful Registration"
})
