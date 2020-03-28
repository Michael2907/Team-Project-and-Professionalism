
"use strict";

assignmentApp.
  controller('guestBookingController',
    [
      '$scope',
      'dataService',
      'applicationData',
      '$location',
      function ($scope, dataService, applicationData, $location) {

        $scope.newGuest = {};
        $scope.guest = {};

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
        // hardcoded data
        // var rowData = [
        //   { id: 1, fullName: "Michael Clayton", numberPlate: "QQ11 WER", email: "michael@clayton", startDateTime: "11-03-2020", endDateTime: "13-03-2020" },
        //   { id: 2, fullName: "Jordan Marshall", numberPlate: "WW22 ASD", email: "jordan@marshall", startDateTime: "12-04-2020", endDateTime: "16-04-2020" },
        // ];

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
        gridOptionsG.columnApi.getAllColumns().forEach(function(column) {
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
          $scope.guest.startDateTime = new Date(oldDateTimeStart[0], oldDateTimeStart[1]-1, oldDateTimeStart[2]);
          $scope.guest.endDateTime = new Date(oldDateTimeEnd[0], oldDateTimeEnd[1]-1, oldDateTimeEnd[2]);

          document.getElementById("editBtnG").disabled = false;
          document.getElementById("deleteBtnG").disabled = false;
        }

        var addModalG = document.getElementById("addModalG");
        var editModalG = document.getElementById("editModalG");
        var deleteModalG = document.getElementById("deleteModalG");

        $scope.addG = function () {
          addModalG.style.display = "block";
        };

        $scope.addGClose = function (response) {
          if (response) {
            $scope.newGuest.userGroup = 3;
            $scope.newGuest.password = "";

            dataService.addGuestUser($scope.newGuest).then(
              function (response) {
                console.log(response)
                getGuestList();
              },
              function (err) {
                getGuestList();
                $scope.status = 'Unable to load data ' + err;
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          addModalG.style.display = "none";
        }

        $scope.editG = function () {
          editModalG.style.display = "block";
        };

        $scope.editGClose = function (response) {
          if (response) {
            $scope.guest.userGroup = 3;
            // Adds 1 hours to time
            $scope.guest.startDateTime.setTime( $scope.guest.startDateTime.getTime() + 60*60*1000 );
            $scope.guest.endDateTime.setTime( $scope.guest.endDateTime.getTime() + 60*60*1000 );
            dataService.updateGuestUser($scope.guest).then(
              function (response) {
                getGuestList();
              },
              function (err) {
                getGuestList();
                $scope.status = 'Unable to load data ' + err;
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          editModalG.style.display = "none";
        }

        $scope.deleteG = function () {
          deleteModalG.style.display = "block";
        };

        $scope.deleteGClose = function (response) {
          if (response) {
            $scope.guest.deleted = true;
            // Adds 1 hours to time
            $scope.guest.startDateTime.setTime( $scope.guest.startDateTime.getTime() + 60*60*1000 );
            $scope.guest.endDateTime.setTime( $scope.guest.endDateTime.getTime() + 60*60*1000 );
            dataService.updateGuestUser($scope.guest).then(
              function (response) {
                getGuestList();
              },
              function (err) {
                getGuestList();
                $scope.status = 'Unable to load data ' + err;
              },
              function (notify) {
                console.log(notify);
              }
            );          }
          deleteModalG.style.display = "none";
        }

        var getGuestList = function () {
          dataService.getGuestList().then(
            function (response) {
              // removes deleted and non guest users from list
              let filteredResponse = response.data.filter(user => user.deleted == false && user.userGroup == 3)
              // further filters any guest bookings that have expired
              for(let i = 0 ; i < filteredResponse.length ; i++){
                var oldDateTime = filteredResponse[i].endDateTime.split("-");
                oldDateTime[2] = oldDateTime[2].substring(0, oldDateTime[2].indexOf('T')); 
                var newDateTime = new Date(oldDateTime[0], oldDateTime[1]-1, oldDateTime[2]-1);
                if(newDateTime < $scope.todaysDate){
                  filteredResponse.splice(i, 1)
                  i--;
                }
              }
              gridOptionsG.api.setRowData(filteredResponse)
            },
            function (err) {
              $scope.status = 'Unable to load data ' + err;
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
