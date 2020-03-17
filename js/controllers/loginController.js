
"use strict";

assignmentApp.
	controller('LoginController',
		[
			'$scope',
			'dataService',
			'applicationData',
			'$location',
			function ($scope, dataService, applicationData, $location) {

				$scope.login = {};

				$scope.reset = {};


				$scope.login = function () {
					// Show
					dataService.login($scope.login).then(
						function (response) {
							console.log(response);
							$scope.login = {};
							$scope.jwt = response
							applicationData.publishInfo('jwt', $scope.jwt);
						},
						function (err) {
							$scope.status = 'Unable to load data ' + err;
						},
						function (notify) {
							console.log(notify);
						}
					);
				};


				// $scope.$on('systemInfo_jwt', function (event, response) {
				// 	$scope.jwt = response;
				// })


				$scope.inputType = 'password';
				$scope.showHideClass = 'glyphicon glyphicon-eye-open';

				$scope.showPassword = function () {
					if ($scope.login.password != null) {
						if ($scope.inputType == 'password') {
							$scope.inputType = 'text';
							$scope.showHideClass = 'glyphicon glyphicon-eye-close';
						}
						else {
							$scope.inputType = 'password';
							$scope.showHideClass = 'glyphicon glyphicon-eye-open';
						}
					}
				};

				var resetPasswordModal = document.getElementById("resetPasswordModal");

				$scope.resetPassword = function () {
					resetPasswordModal.style.display = "block";
		  		};

				$scope.resetPasswordClose = function(response){
					if (response) {
						console.log("do something")
						dataService.deleteWhiteListVehicle($scope.login.loginId).then(
						  function (response) {
							console.log(response)
							getWhiteList();
							
						  },
						  function (err) {
							$scope.status = 'Unable to load data ' + err;
						  },
						  function (notify) {
							console.log(notify);
						  }
						);
					  }
					  resetPasswordModal.style.display = "none";
				}

				$scope.inputTypeOld = 'password';
				$scope.showHideClassOld = 'glyphicon glyphicon-eye-open';

				$scope.showOldPassword = function () {
					if ($scope.reset.oldPassword != null) {
						if ($scope.inputTypeOld == 'password') {
							$scope.inputTypeOld = 'text';
							$scope.showHideClassOld = 'glyphicon glyphicon-eye-close';
						}
						else {
							$scope.inputTypeOld = 'password';
							$scope.showHideClassOld = 'glyphicon glyphicon-eye-open';
						}
					}
				};

				$scope.inputTypeNew = 'password';
				$scope.showHideClassNew = 'glyphicon glyphicon-eye-open';

				$scope.showNewPassword = function () {
					if ($scope.reset.newPassword != null) {
						if ($scope.inputTypeNew == 'password') {
							$scope.inputTypeNew = 'text';
							$scope.showHideClassNew = 'glyphicon glyphicon-eye-close';
						}
						else {
							$scope.inputTypeNew = 'password';
							$scope.showHideClassNew = 'glyphicon glyphicon-eye-open';
						}
					}
				};


			}
		]
	)
