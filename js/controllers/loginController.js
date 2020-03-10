
"use strict";

assignmentApp.
	controller('LoginController',
		[
			'$scope',
			'dataService',
			'applicationData',
			'$location',
			function ($scope, dataService, applicationData, $location) {

				$scope.user = {};
				$scope.standardUser = {};

				$scope.login = function () {
					// Show
					dataService.createUser($scope.user).then(
						function (response) {
							console.log(response);
						},
						function (err) {
							$scope.status = 'Unable to load data ' + err;
						},
						function (notify) {
							console.log(notify);
						}
					);
				};


			}
		]
	)
