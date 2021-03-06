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
      .when("/admin", {
        templateUrl: "js/partials/admin.html",
        controller: "AdminController",
        authenticated: true,
        adminOnly: true
      })
      .when("/login", {
        templateUrl: "js/partials/login.html",
        controller: "LoginController"
      })
      .when("/reports", {
        templateUrl: "js/partials/reporting.html",
        controller: "ReportingController",
        authenticated: false,
        adminOnly: false
      })
      .when("/guest-booking", {
        templateUrl: "js/partials/guestBooking.html",
        controller: "guestBookingController",
        authenticated: true,
        adminOnly: false
      })
      .when("/", {
        templateUrl: "js/partials/landing.html",
        controller: "IndexController",
        authenticated: true,
        adminOnly: false
      })
      .when("/modalTest", {
        templateUrl: "js/partials/testModal.html",
        controller: "ModalDemoCtrl"
      })
      .otherwise({
        redirectTo: "/login"
      });
  }
]);


assignmentApp.run(['$rootScope', '$location', 'authFact', 'applicationData', function ($rootScope, $location, authFact, applicationData) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.$$route.authenticated) {
      // checks there is a JWT Token
      var userAuth = authFact.getAccessToken();
      if (!userAuth) {
        $location.path('/login');
      }
      // checks if route is admin only, user has access or not
      if(next.$$route.adminOnly == true && applicationData.info.userGroup != 1){
        if(current){
          $location.path(current.$$route.originalPath);
        }
      } 
    }
  });
}]);

