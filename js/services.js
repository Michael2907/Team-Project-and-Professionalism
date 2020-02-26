(function () {
    "use strict";
    /** Service to return the data */

    angular.module('AssignmentApp').

        service('applicationData', function ($rootScope) {
            var sharedService = {};
            sharedService.info = {};

            sharedService.publishInfo = function (key, obj) {
                this.info[key] = obj;
                $rootScope.$broadcast('systemInfo_' + key, obj);
            };

            return sharedService;
        }
        ).


        service('dataService',         // the data service name, can be anything we want
            ['$q',                     // dependency, $q handles promises, the request initially returns a promise, not the data
                '$http',                  // dependency, $http handles the ajax request
                function ($q, $http) {     // the parameters must be in the same order as the dependencies


                    var urlBase = '/eam-Project-and-Professionalism/Team-Project-and-Professionalism-Front-end/api/';

                    this.adminLogin = function (admin) {
                        let adminJSON = { "username": admin.username, "password": admin.password };


                        var defer = $q.defer(),             // The promise
                            data = {                        // the data to be passed to the url
                                action: 'adminLogin',
                            };

                        /**
                         * make an ajax get call 
                         * chain calls to .success and .error which will resolve or reject the promise
                         * @param {string} urlBase The url to call, later we'll to this to pass parameters
                         * @param {object} config a configuration object, can contain parameters to pass, in this case we set cache to true
                         * @return {object} promise The call returns, not data, but a promise which only if the call is successful is 'honoured'
                         */
                        $http.post(urlBase + data.action, adminJSON, { cache: true }).                          // notice the dot to start the chain to success()
                            success(function (response) {
                                defer.resolve({
                                    data: response,         // create data property with value from response
                                });
                            }).                                                 // another dot to chain to error()
                            error(function (err) {
                                defer.reject(err);
                            });

                        // the call to getCourses returns this promise which is fulfilled 
                        // by the .get method .success or .failure
                        return defer.promise;

                    };

                    
                    this.guestLogin = function (guest) {
                        let guestJSON = { "fullName": guest.fullName, "numberPlate": guest.numberPlate, "email": guest.email };


                        var defer = $q.defer(),             // The promise
                            data = {                        // the data to be passed to the url
                                action: 'guestLogin',
                            };

                        /**
                         * make an ajax get call 
                         * chain calls to .success and .error which will resolve or reject the promise
                         * @param {string} urlBase The url to call, later we'll to this to pass parameters
                         * @param {object} config a configuration object, can contain parameters to pass, in this case we set cache to true
                         * @return {object} promise The call returns, not data, but a promise which only if the call is successful is 'honoured'
                         */
                        $http.post(urlBase + data.action, guestJSON, { cache: true }).                          // notice the dot to start the chain to success()
                            success(function (response) {
                                defer.resolve({
                                    data: response,         // create data property with value from response
                                });
                            }).                                                 // another dot to chain to error()
                            error(function (err) {
                                defer.reject(err);
                            });

                        // the call to getCourses returns this promise which is fulfilled 
                        // by the .get method .success or .failure
                        return defer.promise;

                    };


                   
                }
            ]
        );
}());