
"use strict";

assignmentApp.
	controller('LoginController',
		[
			'$scope',
			'dataService',
			'applicationData',
			'$location',
			function ($scope, dataService, applicationData, $location) {

				$scope.showAdmin = true;
				$scope.showGuest = false;

				$scope.admin = {};
				$scope.guest = {};

				$scope.showAdminForm = function () {
					$scope.showAdmin = true;
					$scope.showGuest = false;

					var button1 = document.getElementsByClassName("button1")[0].style;
					button1.backgroundColor = '#4CAF50';
					button1.color = 'white';

					var button2 = document.getElementsByClassName("button2")[0].style;
					button2.backgroundColor = 'white';
					button2.color = 'black';
					button2.border = '2px solid #008CBA'
				}

				$scope.showGuestForm = function () {
					$scope.showAdmin = false;
					$scope.showGuest = true;

					var button1 = document.getElementsByClassName("button1")[0].style;
					button1.backgroundColor = 'white';
					button1.color = 'black';
					button1.border = '2px solid #4CAF50'

					var button2 = document.getElementsByClassName("button2")[0].style;
					button2.backgroundColor = '#008CBA';
					button2.color = 'white';

				}

				$scope.adminLogin = function () {
					// Show
					dataService.adminLogin($scope.admin).then(
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

				$scope.guestLogin = function () {
					// Show
					dataService.guestLogin($scope.guest).then(
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
