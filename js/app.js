"use strict"; // turn on javascript strict syntax mode

/**
 * Start a new Application, a module in Angular
 * @param {string} ApplicationName a string which will be the name of the application
 *                 and, in fact, an object to which we add all other components
 * @param {array} dependencies An array of dependencies, the names are passed as strings
 */
var assignmentApp = angular.module("AssignmentApp", [
  "ngRoute", // the only dependency at this stage, for routing
  "ui.bootstrap",
  "chart.js"
]);
// note this fullstop where we chain the call to config
assignmentApp.config([
  "$routeProvider", // built in variable which injects functionality, passed as a string
  function($routeProvider) {
    $routeProvider
      // not working :(
      .when("/admin", {
        templateUrl: "js/partials/admin.html",
        controller: "AdminController"
      })
      .when("/login", {
        templateUrl: "js/partials/login.html",
        controller: "LoginController"
      })
      .when("/reports", {
        templateUrl: "js/partials/reporting.html",
        controller: "ReportingController"
      })
      .when("/", {
        templateUrl: "js/partials/landing.html",
        controller: "IndexController"
      })
      .when("/modalTest", {
        templateUrl: "js/partials/testModal.html",
        controller: "ModalDemoCtrl"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
]); // end of config method
