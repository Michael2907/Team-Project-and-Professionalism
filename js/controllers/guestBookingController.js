
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

        $scope.newGuest.fromDate = new Date(year, month, day)
        $scope.newGuest.toDate = new Date(year, month, day + 1)

        //// current bookings

        var columnDefs = [
          { headerName: "ID", field: "userId", sortable: true, filter: true, resizable: true },
          { headerName: "Name", field: "username", sortable: true, filter: true, resizable: true },
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true, resizable: true },
          { headerName: "Email", field: "email", sortable: true, filter: true, resizable: true },
          { headerName: "From Date", field: "fromDate", sortable: true, filter: true, resizable: true },
          { headerName: "To Date", field: "toDate", sortable: true, filter: true, resizable: true },
        ];

        var rowData = [];
        // hardcoded data
        // var rowData = [
        //   { id: 1, fullName: "Michael Clayton", numberPlate: "QQ11 WER", email: "michael@clayton", fromDate: "11-03-2020", toDate: "13-03-2020" },
        //   { id: 2, fullName: "Jordan Marshall", numberPlate: "WW22 ASD", email: "jordan@marshall", fromDate: "12-04-2020", toDate: "16-04-2020" },
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
          console.log($scope.guest)

          // TO DO - depending on how backend gives the dates
          console.log($scope.guest.toDate)
          console.log($scope.guest.fromDate)        
          var toDate = $scope.guest.toDate.split("-");
          var fromDate = $scope.guest.fromDate.split("-");
          console.log(toDate)
          console.log(fromDate)
          $scope.guest.toDate = new Date(toDate[2], toDate[1], toDate[0])
          $scope.guest.fromDate = new Date(fromDate[2], fromDate[1], fromDate[0])

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
            console.log($scope.newGuest)

            dataService.addGuestUser($scope.newGuest).then(
              function (response) {
                getGuestList();
              },
              function (err) {
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
            console.log($scope.guest)
            $scope.guest.userGroup = 3;
            dataService.editGuestUser($scope.guest).then(
              function (response) {
                getGuestList();
              },
              function (err) {
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
            
            dataService.deleteGuestUser($scope.guest).then(
              function (response) {
                getGuestList();
              },
              function (err) {
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
              console.log(response)
              gridOptionsG.api.setRowData(response.data)
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
