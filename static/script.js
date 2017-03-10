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



  function check_character(password, character_list) {
    var boolean = false;
    for (var i in character_list) {
      if (password.indexOf(character_list[i]) > -1) {
        boolean = true;
      }
    }
    return boolean;
  }

  function change_class(panel_name, boolean) {
    if (boolean == true) {
      $(panel_name).removeClass("failure-panel").addClass("success-panel");
    } else {
      $(panel_name).removeClass("success-panel");
    }
  }

  $scope.change_password = function() {
    //
    var password = $scope.password;
    var password_copy = $scope.password_copy;

    has_symbol = false;
    has_lower_case = false;
    has_upper_case = false;
    has_number = false;
    is_long_enough = false;
    passwords_match = false;

    // Check if the password has the required characters
    has_lower_case = check_character(password, lower_cases);
    has_upper_case = check_character(password, upper_cases);
    has_number = check_character(password, numbers);
    has_symbol = check_character(password, symbols);
    // Check if the password is long enough
    if (password.length >= min_length) {
      is_long_enough = true;
    }
    // Check if the two passwords match
    if (password == password_copy) {
      passwords_match = true;
    }

    // Change the classes for the character and input panels
    change_class("#lower_case_panel", check_character(password, lower_cases));
    change_class("#upper_case_panel", check_character(password, upper_cases));
    change_class("#number_panel", check_character(password, numbers));
    change_class("#symbol_panel", check_character(password, symbols));
    change_class("#input_panel", passwords_match);
  }

  $scope.change_password_copy = function() {
    var password = $scope.password;
    var password_copy = $scope.password_copy;
    if (password == password_copy) {
      passwords_match = true;
    }
    if (passwords_match == true) {
      $("#input_panel").removeClass("failure-panel").addClass("success-panel");
    } else {
      $("#input_panel").removeClass("success-panel");
    }
  }

  $scope.check_password = function() {
    // Will handle the core of the password checking and route to next page
    var pass = true;
    if (has_lower_case != true) {
      pass = false; $("#lower_case_panel").addClass("failure-panel");
    }
    if (has_upper_case != true) {
      pass = false; $("#upper_case_panel").addClass("failure-panel");
    }
    if (has_number != true) {
      pass = false; $("#number_panel").addClass("failure-panel");
    }
    if (has_symbol != true) {
      pass = false; $("#symbol_panel").addClass("failure-panel");
    }
    if (is_long_enough != true) {
      pass = false; $('#length_panel').addClass("failure-panel");
    }
    if (passwords_match != true) {
      pass = false; $("#input_panel").addClass("failure-panel")
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
