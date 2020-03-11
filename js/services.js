
"use strict";
/** Service to return the data */

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


					var defer = $q.defer(),             // The promise
						data = {                        // the data to be passed to the url
							action: 'authenticate',
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

				this.createUser = function (user) {
					let userJSON = { "username": user.username, "password": user.password };


					var defer = $q.defer(),             // The promise
						data = {                        // the data to be passed to the url
							action: 'rinitialiseUser',
						};

					/**
					 * make an ajax get call 
					 * chain calls to .success and .error which will resolve or reject the promise
					 * @param {string} urlBase The url to call, later we'll to this to pass parameters
					 * @param {object} config a configuration object, can contain parameters to pass, in this case we set cache to true
					 * @return {object} promise The call returns, not data, but a promise which only if the call is successful is 'honoured'
					 */
					$http.post(urlBase + data.action, userJSON, { cache: true }).                          // notice the dot to start the chain to success()
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

				////////////////////////////////	White List	 ////////////////////////////////


				this.getWhiteList = function () {
					var defer = $q.defer(),
						data = {                        // the data to be passed to the url
							action: 'user'
						};

					/**
					 * make an ajax get call 
					 * chain calls to .success and .error which will resolve or reject the promise
					 * @param {string} urlBase The url to call, later we'll to this to pass parameters
					 * @param {object} config a configuration object, can contain parameters to pass, in this case we set cache to true
					 * @return {object} promise The call returns, not data, but a promise which only if the call is successful is 'honoured'
					 */
					$http.get(urlBase + data.action, { cache: true }).
						then(function successCallback(response) {
							defer.resolve({
								data: response.data,         // create data property with value from response
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});
					return defer.promise;
				}

				this.editWhiteListUser = function (user) {

					console.log(user)
					// let userJSON = { "username": user.username, "password": user.password };


					// var defer = $q.defer(),             // The promise
					// 	data = {                        // the data to be passed to the url
					// 		action: '/initialiseUser',
					// 	};

					// /**
					//  * make an ajax get call 
					//  * chain calls to .success and .error which will resolve or reject the promise
					//  * @param {string} urlBase The url to call, later we'll to this to pass parameters
					//  * @param {object} config a configuration object, can contain parameters to pass, in this case we set cache to true
					//  * @return {object} promise The call returns, not data, but a promise which only if the call is successful is 'honoured'
					//  */
					// $http.post(urlBase + data.action, userJSON, { cache: true }).                          // notice the dot to start the chain to success()
					// 	success(function (response) {
					// 		defer.resolve({
					// 			data: response,         // create data property with value from response
					// 		});
					// 	}).                                                 // another dot to chain to error()
					// 	error(function (err) {
					// 		defer.reject(err);
					// 	});

					// // the call to getCourses returns this promise which is fulfilled 
					// // by the .get method .success or .failure
					// return defer.promise;

				};

				////////////////////////////////	Black List	 ////////////////////////////////

				this.getBlackList = function () {
					var defer = $q.defer(),
						data = {                        // the data to be passed to the url
							action: 'blacklist'
						};

					/**
					 * make an ajax get call 
					 * chain calls to .success and .error which will resolve or reject the promise
					 * @param {string} urlBase The url to call, later we'll to this to pass parameters
					 * @param {object} config a configuration object, can contain parameters to pass, in this case we set cache to true
					 * @return {object} promise The call returns, not data, but a promise which only if the call is successful is 'honoured'
					 */
					$http.get(urlBase + data.action, { cache: true }).
						then(function successCallback(response) {
							defer.resolve({
								data: response.data,         // create data property with value from response
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});
					return defer.promise;
				}

				this.editBlackListVehicle = function (blackListVehicle) {

					console.log(blackListVehicle)

					var defer = $q.defer(),             // The promise
						data = {                        // the data to be passed to the url
							action: '/blacklist',
						};

					/**
					 * make an ajax get call 
					 * chain calls to .success and .error which will resolve or reject the promise
					 * @param {string} urlBase The url to call, later we'll to this to pass parameters
					 * @param {object} config a configuration object, can contain parameters to pass, in this case we set cache to true
					 * @return {object} promise The call returns, not data, but a promise which only if the call is successful is 'honoured'
					 */
					$http.put(urlBase + data.action, blackListVehicle, { cache: true }).                          // notice the dot to start the chain to success()
						then(function successCallback(response) {
							defer.resolve({
								data: response,         // create data property with value from response
							});

						}, function errorCallback(err) {

							defer.reject(err);
						});

					// the call to getCourses returns this promise which is fulfilled 
					// by the .get method .success or .failure
					return defer.promise;

				};

				this.deleteBlackListVehicle = function (blackListVehicle) {

					console.log(blackListVehicle)
					// let blackListVehicleJSON = { "username": user.username, "password": user.password };


					// var defer = $q.defer(),             // The promise
					// 	data = {                        // the data to be passed to the url
					// 		action: '/blacklist',
					// 	};

					// /**
					//  * make an ajax get call 
					//  * chain calls to .success and .error which will resolve or reject the promise
					//  * @param {string} urlBase The url to call, later we'll to this to pass parameters
					//  * @param {object} config a configuration object, can contain parameters to pass, in this case we set cache to true
					//  * @return {object} promise The call returns, not data, but a promise which only if the call is successful is 'honoured'
					//  */
					// $http.delete(urlBase + data.action, userJSON, { cache: true }).                          // notice the dot to start the chain to success()
					// 	success(function (response) {
					// 		defer.resolve({
					// 			data: response,         // create data property with value from response
					// 		});
					// 	}).                                                 // another dot to chain to error()
					// 	error(function (err) {
					// 		defer.reject(err);
					// 	});

					// // the call to getCourses returns this promise which is fulfilled 
					// // by the .get method .success or .failure
					// return defer.promise;

				};

			}
		]
	);
