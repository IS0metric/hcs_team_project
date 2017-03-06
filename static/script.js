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


app.directive('update_password', function(){

});


/** Main View Controller
 *  Maps the the app's main view, which includes the password checker
 */
app.controller('checker_controller', function($scope, $location) {
  /* Will handle the core of the visual representation, including the random
  characters and symbols, etc */

  $scope.has_symbol = false;
  $scope.has_lower_case = false;
  $scope.has_upper_case = false;
  $scope.has_number = false;

  var symbols = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  $scope.random_symbol = symbols[Math.floor(Math.random() * symbols.length)];

  var lower_cases = "abcdefghijklmnopqrstuvwxyz";
  $scope.random_lower_case = lower_cases[Math.floor(Math.random() * lower_cases.length)];

  var upper_cases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $scope.random_upper_case = upper_cases[Math.floor(Math.random() * upper_cases.length)];

  var numbers = "1234567890";
  $scope.random_number = numbers[Math.floor(Math.random() * numbers.length)];

  console.log($scope.random_number);
  console.log($scope.random_upper_case);
  console.log($scope.random_lower_case);
  console.log($scope.random_symbol);

  $scope.change_password = function() {
    password = $scope.password;

    has_lower_case = false;
    has_upper_case = false;
    has_number = false;
    has_symbol = false;

    for (var i in lower_cases) {
      if (password.indexOf(lower_cases[i]) > -1) {
        has_lower_case = true;
      }
    }
    for (var i in upper_cases) {
      if (password.indexOf(upper_cases[i]) > -1) {
        has_upper_case = true;
      }
    }
    for (var i in symbols) {
      if (password.indexOf(symbols[i]) > -1) {
        has_symbol = true;
      }
    }
    for (var i in numbers) {
      if (password.indexOf(numbers[i]) > -1) {
        has_number = true;
      }
    }

    if (has_lower_case == true){
      $("#lower_case_panel").addClass("success-panel");
    } else {
      $("#lower_case_panel").removeClass("success-panel");
    }
    if (has_upper_case == true){
      $("#upper_case_panel").addClass("success-panel");
    } else {
      $("#upper_case_panel").removeClass("success-panel");
    }
    if (has_number == true){
      $("#number_panel").addClass("success-panel");
    } else {
      $("#number_panel").removeClass("success-panel");
    }
    if (has_symbol == true){
      $("#symbol_panel").addClass("success-panel");
    } else {
      $("#symbol_panel").removeClass("success-panel");
    }
  }

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
