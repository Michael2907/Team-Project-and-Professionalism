
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

				this.login = function (admin) {
					let adminJSON = { "username": admin.username, "password": admin.password };


					var defer = $q.defer(),
						data = {
							action: 'authenticate',
						};

					$http.post(urlBase + data.action, adminJSON, { cache: true }).

						then(function successCallback(response) {
							defer.resolve({
								data: response.data,
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

					console.log(whiteListVehicle)

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

				this.editWhiteListVehicle = function (whiteListVehicle) {

					console.log(whiteListVehicle)

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

				this.deleteWhiteListVehicle = function (whiteListVehicle) {

					console.log(whiteListVehicle)
					// let whiteListVehicleJSON = { "username": user.username, "password": user.password };


					var defer = $q.defer(),
						data = {
							action: '/user?userId=' + whiteListVehicle,
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

					console.log(blackListVehicle)

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

					console.log(blackListVehicle)

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

					console.log(blackListVehicle)
					// let blackListVehicleJSON = { "username": user.username, "password": user.password };

					var defer = $q.defer(),
						data = {
							action: '/blacklist?numberPlate=' + blackListVehicle,
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
							action: 'user/guests'
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

					console.log(guestUser)

					var defer = $q.defer(),
						data = {
							action: 'user',
						};

					$http.put(urlBase + data.action, guestUser, { cache: true }).
						then(function successCallback(response) {
							defer.resolve({
								data: response,
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});

					return defer.promise;

				};

				this.editGuestUser = function (guestUser) {

					console.log(guestUser)

					var defer = $q.defer(),
						data = {
							action: 'user',
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

				this.deleteGuestUser = function (guestUser) {

					console.log(guestUser)

					var defer = $q.defer(),
						data = {
							action: '/user?userId=' + guestUser,
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

				this.checkSuspiciousVehicle = function (numberPlate) {
					var defer = $q.defer(),
						data = {
							action: 'checkSuspiciousVehicle?numberPlate=' + numberPlate
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
	
	
	
	// .
	// factory('Auth', function () {
	// 	var user;

	// 	return {
	// 		setUser: function (aUser) {
	// 			user = aUser;
	// 		},
	// 		isLoggedIn: function () {
	// 			return (user) ? user : false;
	// 		}
	// 	}
	// })
