
"use strict";

assignmentApp.
	controller('LoginController',
		[
			'$scope',
			'dataService',
			'applicationData',
			'$location',
			'authFact',
			function ($scope, dataService, applicationData, $location, authFact) {

				$scope.login = {};
				$scope.reset = {};
				$scope.errorMessage = "";
				$scope.message = "";

				$scope.login = function () {
					// Show
					dataService.login($scope.login).then(
						function (response) {
							if(response){

							
							// success
							if(response.status != 401){
								if(response.data.user.initialised == false){ // first time user has logged on
									resetPasswordModal.style.display = "block";
									$scope.message = "This is the first time you are logging in. Please reset your password."
								} else { // user already initialised
									$scope.errorMessage = "";
									$scope.message = "";
									authFact.setAccessToken(response.data.jwtToken)
									// TO DO: change to -  response.data.userGroup
									applicationData.publishInfo('userGroup', 1);
									$scope.login = {};
									$location.path("/");
								}
							} else {
								$scope.errorMessage = response.message
							}
}

						},
						function (err) {
							$scope.status = 'Unable to load data ' + err;
						},
						function (notify) {
							console.log(notify);
						}
					);
				};


				// $scope.$on('systemInfo_token', function (event, response) {
				// 	$scope.token = response;
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
						dataService.changePassword($scope.reset).then(
						  function (response) {
							if(response.data.status == 200){
								$scope.errorMessage = "Please login with your updated password"
							}							
						  },
						  function (err) {
							$scope.status = 'Unable to load data ' + err;
						  },
						  function (notify) {
							console.log(notify);
						  }
						);
					  }
					  $scope.login.password = ""
					  $scope.reset = {};
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
