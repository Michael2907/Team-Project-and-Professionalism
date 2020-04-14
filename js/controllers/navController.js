"use strict";

assignmentApp.controller("NavController", [
  "$scope",
  "dataService",
  "applicationData",
  "$location",
  "authFact",
  function($scope, dataService, applicationData, $location, authFact) {
    $scope.$on("systemInfo_userGroup", function(event, response) {
      $scope.userGroup = response;
    });

    $scope.$on("$routeChangeStart", function(event, next, current) {
      $scope.displayNav = next.$$route.controller;
    });

    $scope.logout = function() {
      applicationData.publishInfo("userGroup", null);
      authFact.setAccessToken(null);
      $location.path("/login");
    };
  }
]);
