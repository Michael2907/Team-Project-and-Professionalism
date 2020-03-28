"use strict";
// Service to return the data


assignmentApp.
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


				var urlBase = 'http://carparkrecognitionsystemapi.azurewebsites.net/cpmAPI/api/';

				////////////////////////////////	Login	 ////////////////////////////////

				this.login = function (user) {
					let userJSON = { "username": user.username, "password": user.password };


					var defer = $q.defer(),
						data = {
							action: 'authenticate',
						};

					$http.post(urlBase + data.action, userJSON, { cache: true }).

						then(function successCallback(response) {
							defer.resolve({
								data: response.data,
							});

						}, function errorCallback(err) {

							defer.resolve(err.data);


						});
					return defer.promise;

				};

				
				this.changePassword = function (user) {
					let userJSON = { "username": user.username, "password": user.oldPassword };


					var defer = $q.defer(),
						data = {
							action: 'user/changePassword?newPassword=' + user.newPassword,
						};

					$http.put(urlBase + data.action, userJSON, { cache: true }).

						then(function successCallback(response) {
							defer.resolve({
								data: response,
							});

						}, function errorCallback(err) {

							defer.resolve(err.data);


						});
					return defer.promise;

				};
				// this.createUser = function (user) {
				// 	let userJSON = { "username": user.username, "password": user.password };


				// 	var defer = $q.defer(),             
				// 		data = {                        
				// 			action: 'initialiseUser',
				// 		};

				// 	$http.post(urlBase + data.action, userJSON, { cache: true }).                          

				// 		then(function successCallback(response) {
				// 			defer.resolve({
				// 				data: response,         
				// 			});

				// 		}, function errorCallback(err) {

				// 			defer.reject(err);
				// 		});
				// 	return defer.promise;

				// };

				////////////////////////////////	White List	 ////////////////////////////////


				this.getWhiteList = function () {
					var defer = $q.defer(),
						data = {
							action: 'user'
						};

						$http.get(urlBase + data.action, { cache: false }).
						then(function successCallback(response) {
							defer.resolve({
								data: response.data,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});
					return defer.promise;
				}

				this.addWhiteListVehicle = function (whiteListVehicle) {
					var defer = $q.defer(),
						data = {
							action: 'initialiseUser',
						};

					$http.post(urlBase + data.action, whiteListVehicle, { cache: true }).
						then(function successCallback(response) {
							defer.resolve({
								data: response,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});

					return defer.promise;

				};

				this.updateWhiteListVehicle = function (whiteListVehicle) {

					var defer = $q.defer(),
						data = {
							action: 'user',
						};

						$http.put(urlBase + data.action, whiteListVehicle, { cache: true }).
						then(function successCallback(response) {
							defer.resolve({
								data: response,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});

					return defer.promise;

				};

				// this.deleteWhiteListVehicle = function (whiteListVehicle) {

				// 	var defer = $q.defer(),
				// 		data = {
				// 			action: 'user',
				// 		};

				// 		$http.put(urlBase + data.action, whiteListVehicle, { cache: true }).
				// 		then(function successCallback(response) {
				// 			defer.resolve({
				// 				data: response,
				// 			});

				// 		}, function errorCallback(err) {

				// 			defer.reject(err);
				// 		});

				// 	return defer.promise;

				// };

				////////////////////////////////	Black List	 ////////////////////////////////

				this.getBlackList = function () {
					var defer = $q.defer(),
						data = {
							action: 'blacklist'
						};

					$http.get(urlBase + data.action, { cache: false }).
						then(function successCallback(response) {
							defer.resolve({
								data: response.data,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});
					return defer.promise;
				}

				this.addBlackListVehicle = function (blackListVehicle) {
					var defer = $q.defer(),
						data = {
							action: 'blacklist',
						};

					$http.put(urlBase + data.action, blackListVehicle, { cache: true }).
						then(function successCallback(response) {
							defer.resolve({
								data: response,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});

					return defer.promise;

				};

				this.editBlackListVehicle = function (blackListVehicle) {

					var defer = $q.defer(),
						data = {
							action: 'blacklist',
						};

					$http.put(urlBase + data.action, blackListVehicle, { cache: true }).
						then(function successCallback(response) {
							defer.resolve({
								data: response,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});

					return defer.promise;

				};

				this.deleteBlackListVehicle = function (blackListVehicle) {

					var defer = $q.defer(),
						data = {
							action: 'blacklist?numberPlate=' + blackListVehicle,
						};

					$http.delete(urlBase + data.action, { cache: true }).
						then(function successCallback(response) {
							defer.resolve({
								data: response,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});

					return defer.promise;

				};


				////////////////////////////////	Guest List	 ////////////////////////////////

				this.getGuestList = function () {
					var defer = $q.defer(),
						data = {
							action: 'user'
						};

					$http.get(urlBase + data.action, { cache: false }).
						then(function successCallback(response) {
							defer.resolve({
								data: response.data,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});
					return defer.promise;
				}

				this.addGuestUser = function (guestUser) {

					var defer = $q.defer(),
						data = {
							action: 'initialiseUser',
						};

					$http.post(urlBase + data.action, guestUser, { cache: false }).
						then(function successCallback(response) {
							defer.resolve({
								data: response,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});

					return defer.promise;

				};

				this.updateGuestUser = function (guestUser) {

					var defer = $q.defer(),
						data = {
							action: 'user',
						};

					$http.put(urlBase + data.action, guestUser, { cache: false }).
						then(function successCallback(response) {
							defer.resolve({
								data: response,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});

					return defer.promise;

				};

				// this.deleteGuestUser = function (guestUser) {

				// 	var defer = $q.defer(),
				// 		data = {
				// 			action: 'user?userId=' + guestUser,
				// 		};

				// 	$http.delete(urlBase + data.action, { cache: true }).
				// 		then(function successCallback(response) {
				// 			defer.resolve({
				// 				data: response,
				// 			});

				// 		}, function errorCallback(err) {

				// 			defer.reject(err);
				// 		});

				// 	return defer.promise;

				// };

        this.getActivities = (startDate, endDate) => {
          var defer = $q.defer(), // The promise
            data = {
              // the data to be passed to the url
              action: "activity"
            };

          $http
            .get(urlBase + data.action, { startDate, endDate })
            .then(response => defer.resolve({ data: response }))
            .catch(err => {
              defer.reject(err);
            });

          return defer.promise;
        };
        
				// https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/vehicle-enquiry-service-description.html#register-for-ves-api
				this.checkSuspiciousVehicle = function (numberPlate) {
					let body = { "registrationNumber": numberPlate }

					// name: x-api-key
					// value: {supplied API key}
					// body: {"registrationNumber": "ABC1234"}		

					var defer = $q.defer(),
						data = {};

					$http.post("https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles", body, { cache: false }).
						then(function successCallback(response) {
							defer.resolve({
								data: response.data,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});
					return defer.promise;
				}

			}
		]
	).
	factory('authFact', function () {
		var authFact = {};
		authFact.setAccessToken = function(token){
			authFact.token = token;
		}

		authFact.getAccessToken = function(){
		   return authFact.token;
		}

		authFact.setUserGroup = function(userGroup){
			authFact.userGroup = userGroup;
		}

		authFact.getUserGroup = function(){
		   return authFact.userGroup;
		}

		return authFact;

	})
