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


                    $scope.admin = false;
                    $scope.userLogin = {};

                    $scope.login = function () {
                        // Show
                        modal.style.display = "block";
                        dataService.login($scope.userLogin).then(  // then() is called when the promise is resolve or rejected
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