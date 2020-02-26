(function () {
    "use strict";

    angular.module('AssignmentApp').
        controller('IndexController',
            [
                '$scope',
                'dataService',
                'applicationData',
                '$location',
                function ($scope, dataService, applicationData, $location) {

                }
            ]
        ).
        controller('LoginController',
            [
                '$scope',
                'dataService',
                'applicationData',
                '$location',
                function ($scope, dataService, applicationData, $location) {

                    var modal = document.getElementById("loginModal");


                    $scope.showAdmin = true;
                    $scope.showGuest = false;

                    $scope.admin = {};
                    $scope.guest = {};


                    $scope.showAdminForm = function (){
                        $scope.showAdmin = true;
                        $scope.showGuest = false;
                    }

                    $scope.showGuestForm = function (){
                        $scope.showAdmin = false;
                        $scope.showGuest = true;
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

}());