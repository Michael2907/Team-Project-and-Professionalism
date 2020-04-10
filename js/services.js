"use strict";
// Service to return the data


assignmentApp.
	service('applicationData', function ($rootScope) {
		// used to share data bewteen controllers
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

				var urlBase = 'https://carparkrecognitionsystemapi.azurewebsites.net/cpmAPI/api/';

				////////////////////////////////	Login	 ////////////////////////////////

				// authenciates users by returning a jwt token 
				this.login = function (user) {
					let userJSON = { "username": user.username, "password": user.password };

					var defer = $q.defer(),
						data = {
							action: 'authenticate',
						};

					$http.post(urlBase + data.action, userJSON, { cache: false }).
						then(function successCallback(response) {
							defer.resolve({
								data: response.data,
							});

						}, function errorCallback(err) {
							defer.resolve(err.data);
						});
					return defer.promise;

				};

				// changes users password, mianly called when new user 
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


				////////////////////////////////	White List	 ////////////////////////////////


				this.getWhiteList = function (jwtToken) {
					var defer = $q.defer(),
						data = {
							action: 'user'
						};

					$http.get(urlBase + data.action, {
						cache: false,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer " + jwtToken
						}
					}).then(function successCallback(response) {
						defer.resolve({
							data: response.data,
						});
					}, function errorCallback(err) {
						defer.reject(err);
					});
					return defer.promise;
				}

				this.addWhiteListVehicle = function (whiteListVehicle, jwtToken) {
					var defer = $q.defer(),
						data = {
							action: 'initialiseUser',
						};

					$http.post(urlBase + data.action, whiteListVehicle, {
						cache: true,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer " + jwtToken
						}
					}).then(function successCallback(response) {
						defer.resolve({
							data: response,
						});
					}, function errorCallback(err) {
						defer.reject(err);
					});

					return defer.promise;
				};

				this.updateWhiteListVehicle = function (whiteListVehicle, jwtToken) {

					var defer = $q.defer(),
						data = {
							action: 'user',
						};

					$http.put(urlBase + data.action, whiteListVehicle, {
						cache: true,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer " + jwtToken
						}
					}).then(function successCallback(response) {
						defer.resolve({
							data: response,
						});
					}, function errorCallback(err) {
						defer.reject(err);
					});
					return defer.promise;
				};


				////////////////////////////////	Black List	 ////////////////////////////////

				this.getBlackList = function (jwtToken) {
					var defer = $q.defer(),
						data = {
							action: 'blacklist'
						};

					$http.get(urlBase + data.action, {
						cache: false,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer " + jwtToken
						}
					}).then(function successCallback(response) {
						defer.resolve({
							data: response.data,
						});

					}, function errorCallback(err) {

						defer.reject(err);
					});
					return defer.promise;
				}

				this.addBlackListVehicle = function (blackListVehicle, jwtToken) {
					var defer = $q.defer(),
						data = {
							action: 'blacklist',
						};

					$http.put(urlBase + data.action, blackListVehicle, {
						cache: true,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer " + jwtToken
						}
					}).then(function successCallback(response) {
						defer.resolve({
							data: response,
						});

					}, function errorCallback(err) {

						defer.reject(err);
					});

					return defer.promise;

				};

				this.editBlackListVehicle = function (blackListVehicle, jwtToken) {

					var defer = $q.defer(),
						data = {
							action: 'blacklist',
						};

					$http.put(urlBase + data.action, blackListVehicle, {
						cache: true,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer " + jwtToken
						}
					}).then(function successCallback(response) {
						defer.resolve({
							data: response,
						});

					}, function errorCallback(err) {

						defer.reject(err);
					});

					return defer.promise;

				};

				this.deleteBlackListVehicle = function (blackListVehicle, jwtToken) {

					var defer = $q.defer(),
						data = {
							action: 'blacklist?numberPlate=' + blackListVehicle,
						};

					$http.delete(urlBase + data.action, {
						cache: true,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer " + jwtToken
						}
					}).then(function successCallback(response) {
						defer.resolve({
							data: response,
						});

					}, function errorCallback(err) {

						defer.reject(err);
					});

					return defer.promise;

				};


				////////////////////////////////	Guest List	 ////////////////////////////////

				this.getGuestList = function (jwtToken) {
					var defer = $q.defer(),
						data = {
							action: 'user'
						};

					$http.get(urlBase + data.action, {
						cache: false,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer " + jwtToken
						}
					}).then(function successCallback(response) {
						defer.resolve({
							data: response.data,
						});

					}, function errorCallback(err) {

						defer.reject(err);
					});
					return defer.promise;
				}

				this.addGuestUser = function (guestUser, jwtToken) {

					var defer = $q.defer(),
						data = {
							action: 'initialiseUser',
						};

					$http.post(urlBase + data.action, guestUser, {
						cache: false,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer " + jwtToken
						}
					}).then(function successCallback(response) {
						defer.resolve({
							data: response,
						});

					}, function errorCallback(err) {

						defer.reject(err);
					});

					return defer.promise;

				};

				this.updateGuestUser = function (guestUser, jwtToken) {

					var defer = $q.defer(),
						data = {
							action: 'user',
						};

					$http.put(urlBase + data.action, guestUser, {
						cache: false,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Bearer " + jwtToken
						}
					}).then(function successCallback(response) {
						defer.resolve({
							data: response,
						});

					}, function errorCallback(err) {

						defer.reject(err);
					});

					return defer.promise;

				};



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

				this.checkSuspiciousVehicle = function (numberPlate) {
					let body = { registrationNumber: numberPlate }

					var defer = $q.defer()

					$http.post("https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles", JSON.stringify(body), {
						headers: {
							"Content-Type": "application/json",
							"x-api-key": "HdSftuDOYT1M5lp6BAnqw428qZWLP6HG7jDN1owN"
						}
					}).then(function successCallback(response) {
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
	factory('authFact', function () { // used to store the JWT Token
		var authFact = {};
		authFact.setAccessToken = function (token) {
			authFact.token = token;
		}

		authFact.getAccessToken = function () {
			return authFact.token;
		}

		return authFact;

	})
