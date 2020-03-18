"use strict";

assignmentApp.
	controller('NavController',
		[
			'$scope',
			'dataService',
			'applicationData',
			'$location',
			'authFact',
			function ($scope, dataService, applicationData, $location, authFact) {

				$scope.$on('systemInfo_userGroup', function (event, response) {
					$scope.userGroup = response;
                    console.log(response)
                })
                

                $scope.logout = function(){
                    applicationData.publishInfo('userGroup', null);
                    authFact.setAccessToken(null)
                    $location.path("/login");

                }
			}
		]
	)

