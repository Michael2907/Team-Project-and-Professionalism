
"use strict";

assignmentApp.
  controller('guestBookingController',
    [
      '$scope',
      'dataService',
      'authFact',
      'applicationData',
      '$location',
      function ($scope, dataService, authFact, applicationData, $location) {

        $scope.newGuest = {};
        $scope.guest = {};
        $scope.newUser = {};

        $scope.jwtToken = "";
        $scope.jwtToken = authFact.getAccessToken();

        var date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        $scope.todaysDate = new Date(year, month, day);
        $scope.newGuest.startDateTime = new Date(year, month, day);
        $scope.newGuest.endDateTime = new Date(year, month, day + 1);

        //// current bookings

        var columnDefs = [
          { headerName: "ID", field: "userId", sortable: true, filter: true, resizable: true },
          { headerName: "Name", field: "username", sortable: true, filter: true, resizable: true },
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true, resizable: true },
          { headerName: "Email", field: "email", sortable: true, filter: true, resizable: true },
          { headerName: "From Date", field: "startDateTime", sortable: true, filter: true, resizable: true },
          { headerName: "To Date", field: "endDateTime", sortable: true, filter: true, resizable: true },
        ];

        var rowData = [];

        var gridOptionsG = {
          columnDefs: columnDefs,
          rowData: rowData,
          rowSelection: 'single',
          onSelectionChanged: onSelectionChangedG,
          pagination: true,
          paginationPageSize: 10,

        };

        var eGridDiv = document.querySelector('#currentBookings');
        new agGrid.Grid(eGridDiv, gridOptionsG);

        var allColumnIds = [];
        gridOptionsG.columnApi.getAllColumns().forEach(function (column) {
          allColumnIds.push(column.colId);
        });

        gridOptionsG.columnApi.autoSizeColumns(allColumnIds, false);

        function onSelectionChangedG() {
          var selectedRows = gridOptionsG.api.getSelectedRows();
          $scope.guest = selectedRows[0];
          var oldDateTimeStart = $scope.guest.startDateTime.split("-");
          var oldDateTimeEnd = $scope.guest.endDateTime.split("-");
          oldDateTimeStart[2] = oldDateTimeStart[2].substring(0, oldDateTimeStart[2].indexOf('T'));
          oldDateTimeEnd[2] = oldDateTimeEnd[2].substring(0, oldDateTimeEnd[2].indexOf('T'));
          $scope.guest.startDateTime = new Date(oldDateTimeStart[0], oldDateTimeStart[1] - 1, oldDateTimeStart[2]);
          $scope.guest.endDateTime = new Date(oldDateTimeEnd[0], oldDateTimeEnd[1] - 1, oldDateTimeEnd[2]);

          document.getElementById("editBtnG").disabled = false;
          document.getElementById("deleteBtnG").disabled = false;
        }

        var addModalG = document.getElementById("addModalG");
        var editModalG = document.getElementById("editModalG");
        var deleteModalG = document.getElementById("deleteModalG");

        $scope.userID = applicationData.info.userID

        $scope.addG = function () {
          addModalG.style.display = "block";
        };

        $scope.addGClose = function (response) {
          if (response) {
            $scope.newGuest.startDateTime.setTime($scope.newGuest.startDateTime.getTime() + 60 * 60 * 1000);
            $scope.newGuest.endDateTime.setTime($scope.newGuest.endDateTime.getTime() + 60 * 60 * 1000);
            $scope.newGuest.userGroup = 3;
            $scope.newGuest.password = "";

            dataService.addGuestUser($scope.newGuest, $scope.jwtToken, $scope.userID).then(
              function (response) {
                getGuestList();
              },
              function (err) {
                getGuestList();
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          $scope.newGuest = {};
          $scope.newGuest.startDateTime = new Date(year, month, day);
          $scope.newGuest.endDateTime = new Date(year, month, day + 1);
          addModalG.style.display = "none";
        }

        $scope.editG = function () {
          $scope.userGroup = applicationData.info.userGroup
          editModalG.style.display = "block";
          $scope.guest.userGroup = "3";
        };

        $scope.editGClose = function (response) {
          if (response) {
            $scope.guest.userGroup = parseInt($scope.guest.userGroup);
            // Adds 1 hours to time
            $scope.guest.startDateTime.setTime($scope.guest.startDateTime.getTime() + 60 * 60 * 1000);
            $scope.guest.endDateTime.setTime($scope.guest.endDateTime.getTime() + 60 * 60 * 1000);

            if ($scope.guest.userGroup == 2) { // initialise user and remove guest

              // iniailise standrard user
              $scope.newUser.userGroup = $scope.guest.userGroup;
              $scope.newUser.username = $scope.guest.username;
              $scope.newUser.numberPlate = $scope.guest.numberPlate;
              $scope.newUser.email = $scope.guest.email;
              $scope.newUser.password = null;
              $scope.newUser.username = $scope.newUser.username + "1";

              dataService.addWhiteListVehicle($scope.newUser, $scope.jwtToken, $scope.userID).then(
                function (response) {
                  // do nothing             
                },
                function (err) {
                  // do nothing    
                },
                function (notify) {
                  console.log(notify);
                }
              );

              // delete guest
              $scope.guest.deleted = true;
              dataService.updateGuestUser($scope.guest, $scope.jwtToken, $scope.userID).then(
                function (response) {
                  getGuestList();
                },
                function (err) {
                  getGuestList();
                },
                function (notify) {
                  console.log(notify);
                }
              );

            } else { // update as normal

              dataService.updateGuestUser($scope.guest, $scope.jwtToken, $scope.userID).then(
                function (response) {
                  getGuestList();
                },
                function (err) {
                  getGuestList();
                },
                function (notify) {
                  console.log(notify);
                }
              );
            }
          }
          editModalG.style.display = "none";
          $scope.newUser = {};
        }

        $scope.deleteG = function () {
          deleteModalG.style.display = "block";
        };

        $scope.deleteGClose = function (response) {
          if (response) {
            $scope.guest.deleted = true;
            // Adds 1 hours to time
            $scope.guest.startDateTime.setTime($scope.guest.startDateTime.getTime() + 60 * 60 * 1000);
            $scope.guest.endDateTime.setTime($scope.guest.endDateTime.getTime() + 60 * 60 * 1000);
            dataService.updateGuestUser($scope.guest, $scope.jwtToken, $scope.userID).then(
              function (response) {
                getGuestList();
              },
              function (err) {
                getGuestList();
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          deleteModalG.style.display = "none";
        }

        var getGuestList = function () {
          dataService.getGuestList($scope.jwtToken).then(
            function (response) {
              // removes deleted and non guest users from list
              let filteredResponse = response.data.filter(user => user.deleted == false && user.userGroup == 3)
              // further filters any guest bookings that have expired
              for (let i = 0; i < filteredResponse.length; i++) {
                var oldDateTime = filteredResponse[i].endDateTime.split("-");
                oldDateTime[2] = oldDateTime[2].substring(0, oldDateTime[2].indexOf('T'));
                var newDateTime = new Date(oldDateTime[0], oldDateTime[1] - 1, oldDateTime[2]);
                if (newDateTime <= $scope.todaysDate) {
                  if (newDateTime - $scope.todaysDate != 0) {
                    filteredResponse.splice(i, 1)
                    i--;
                  }
                }
              }
              gridOptionsG.api.setRowData(filteredResponse)
            },
            function (err) {

            },
            function (notify) {
              console.log(notify);
            }
          );
        };

        getGuestList();


      }
    ]
  )
