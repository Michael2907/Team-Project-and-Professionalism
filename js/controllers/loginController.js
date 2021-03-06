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
				$scope.jwtToken = "";

				$scope.login = function () {
					// Show
					dataService.login($scope.login).then(
						function (response) {
							if (response) {
								// success
								if (response.status != 401) {
									if (response.data.user.initialised == false) { // first time user has logged on
										resetPasswordModal.style.display = "block";
										$scope.message = "This is the first time you are logging in. Please reset your password.";
										$scope.jwtToken = response.data.jwtToken;

									} else { // user already initialised
										$scope.errorMessage = "";
										$scope.message = "";
										authFact.setAccessToken(response.data.jwtToken)
										applicationData.publishInfo('userGroup', response.data.user.userGroup);
										applicationData.publishInfo('username', response.data.user.username);
										applicationData.publishInfo('userID', response.data.user.userId);

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

				var resetPasswordModal = document.getElementById("resetPasswordModal");


				$scope.resetPassword = function () {
					resetPasswordModal.style.display = "block";
					$scope.jwtToken = authFact.getAccessToken();

				};

				$scope.resetPasswordClose = function (response) {
					if (response) {
						dataService.changePassword($scope.reset, $scope.jwtToken).then(
							function (response) {
								if (response.data.status == 200) {
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

				$scope.inputType = 'password';

				$scope.showPassword = function () {
					if ($scope.login.password != null) {
						if ($scope.inputType == 'password') {
							$scope.inputType = 'text';
						}
						else {
							$scope.inputType = 'password';
						}
					}
				};

				$scope.inputTypeOld = 'password';

				$scope.showOldPassword = function () {
					if ($scope.reset.oldPassword != null) {
						if ($scope.inputTypeOld == 'password') {
							$scope.inputTypeOld = 'text';
						}
						else {
							$scope.inputTypeOld = 'password';
						}
					}
				};

				$scope.inputTypeNew = 'password';

				$scope.showNewPassword = function () {
					if ($scope.reset.newPassword != null) {
						if ($scope.inputTypeNew == 'password') {
							$scope.inputTypeNew = 'text';
						}
						else {
							$scope.inputTypeNew = 'password';
						}
					}
				};
			}
		]
	)

