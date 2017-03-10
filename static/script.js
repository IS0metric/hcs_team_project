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

  var has_symbol = false;
  var has_lower_case = false;
  var has_upper_case = false;
  var has_number = false;
  var is_long_enough = false;
  var passwords_match = false;

  var symbols = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  $scope.random_symbol = symbols[Math.floor(Math.random() * symbols.length)];

  var lower_cases = "abcdefghijklmnopqrstuvwxyz";
  $scope.random_lower_case = lower_cases[Math.floor(Math.random() * lower_cases.length)];

  var upper_cases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $scope.random_upper_case = upper_cases[Math.floor(Math.random() * upper_cases.length)];

  var numbers = "1234567890";
  $scope.random_number = numbers[Math.floor(Math.random() * numbers.length)];

  var min_length = 8;

  $scope.change_password = function() {
    var password = $scope.password;
    var password_copy = $scope.password_copy

    has_symbol = false;
    has_lower_case = false;
    has_upper_case = false;
    has_number = false;
    is_long_enough = false;
    passwords_match = false;

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
    if (password.length >= min_length) {
      is_long_enough = true;
    }
    if (password != password_copy) {
      passwords_match = true;
    }

    if (has_lower_case == true) {
      $("#lower_case_panel").removeClass("failure-panel").addClass("success-panel");
    } else {
      $("#lower_case_panel").removeClass("success-panel");
    }
    if (has_upper_case == true) {
      $("#upper_case_panel").removeClass("failure-panel").addClass("success-panel");
    } else {
      $("#upper_case_panel").removeClass("success-panel");
    }
    if (has_number == true) {
      $("#number_panel").removeClass("failure-panel").addClass("success-panel");
    } else {
      $("#number_panel").removeClass("success-panel");
    }
    if (has_symbol == true) {
      $("#symbol_panel").removeClass("failure-panel").addClass("success-panel");
    } else {
      $("#symbol_panel").removeClass("success-panel");
    }
    if (is_long_enough == true) {
      $("#length_panel").removeClass("failure-panel").addClass("success-panel");
    } else {
      $("#length_panel").removeClass("success-panel");
    }
    if (passwords_match == true) {
      // TODO: Set the passwords input panel to be green
    } else {
      // TODO: Set the passwords input panel to be default
    }
  }

  $scope.check_password = function() {
    // Will handle the core of the password checking and route to next page
    var pass = true;
    if (has_lower_case != true) {
      pass = false;
      $("#lower_case_panel").addClass("failure-panel");
    }
    if (has_upper_case != true) {
      pass = false;
      $("#upper_case_panel").addClass("failure-panel");
    }
    if (has_number != true) {
      pass = false;
      $("#number_panel").addClass("failure-panel");
    }
    if (has_symbol != true) {
      pass = false;
      $("#symbol_panel").addClass("failure-panel");
    }
    if (is_long_enough != true) {
      pass = false;
      $('#length_panel').addClass("failure-panel");
    }
    if (passwords_match != true) {
      pass = false;
      // TODO: Set password input panel to be red
    }
    if (pass == true) {
      $location.path("/success");
    }
  }


});


/** Success Controller
 *  Maps to the success page
 */
app.controller('success_controller', function($scope, $location) {
  $scope.success_message = "Successful Registration"
})
