
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
          { headerName: "ID", field: "id", sortable: true, filter: true },
          { headerName: "Full Name", field: "fullName", sortable: true, filter: true },
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true },
          { headerName: "Email", field: "email", sortable: true, filter: true },
          { headerName: "From Date", field: "fromDate", sortable: true, filter: true },
          { headerName: "To Date", field: "toDate", sortable: true, filter: true },
        ];

        // hardcoded data
        var rowData = [
          { id: 1, fullName: "Michael Clayton", numberPlate: "QQ11 WER", email: "michael@clayton", fromDate: "11-03-2020", toDate: "13-03-2020" },
          { id: 2, fullName: "Jordan Marshall", numberPlate: "WW22 ASD", email: "jordan@marshall", fromDate: "12-04-2020", toDate: "16-04-2020" },
        ];

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

        function onSelectionChangedG() {
          var selectedRows = gridOptionsG.api.getSelectedRows();
          $scope.guest = selectedRows[0];
          var names = $scope.guest.fullName.split(" ");
          $scope.guest.firstName = names[0]
          $scope.guest.surname = names[1]
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
            $scope.newGuest.fullName = $scope.newGuest.firstName + " " + $scope.newGuest.surname
            console.log($scope.newGuest)
          }
          addModalG.style.display = "none";
        }

        $scope.editG = function () {
          editModalG.style.display = "block";
        };

        $scope.editGClose = function (response) {
          if (response) {
            $scope.guest.fullName = $scope.guest.firstName + " " + $scope.guest.surname
            console.log($scope.guest)
          }
          editModalG.style.display = "none";
        }

        $scope.deleteG = function () {
          deleteModalG.style.display = "block";
        };

        $scope.deleteGClose = function (response) {
          if (response) {
            console.log("do something")
          }
          deleteModalG.style.display = "none";
        }
      }
    ]
  )