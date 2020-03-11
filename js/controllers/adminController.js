
"use strict";

assignmentApp.
  controller('AdminController',
    [
      '$scope',
      'dataService',
      'applicationData',
      '$location',
      function ($scope, dataService) {



        // White List

        var columnDefsW = [
          { headerName: "ID", field: "userId", sortable: true, filter: true },
          { headerName: "Name", field: "username", sortable: true, filter: true },
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true },
          { headerName: "Email", field: "email", sortable: true, filter: true },
          { headerName: "User Group", field: "userGroup", sortable: true, filter: true },
        ];
        var rowDataW = [];
        // var rowDataW = [
        //   { id: 1, name: "Michael Clayton", numberPlate: "QQ11 WER", userGroup: "admin" },
        //   { id: 2, name: "Jordan Marshall", numberPlate: "WW22 ASD", userGroup: "standard" },
        // ];
        var gridOptionsW = {
          columnDefs: columnDefsW,
          rowData: rowDataW,
          rowSelection: 'single',
          onSelectionChanged: onSelectionChangedW,
          pagination: true,
          paginationPageSize: 10,

        };
        var eGridDivW = document.querySelector('#whiteListGrid');
        new agGrid.Grid(eGridDivW, gridOptionsW);

        $scope.newUser = {
          userGroup: "standard"
        }
        $scope.user = {
          userGroup: "standard"
        }

        function onSelectionChangedW() {
          var selectedRows = gridOptionsW.api.getSelectedRows();
          $scope.user = selectedRows[0];
          document.getElementById("editBtnW").disabled = false;
          document.getElementById("deleteBtnW").disabled = false;

          document.getElementById("editBtnB").disabled = true;
          document.getElementById("deleteBtnB").disabled = true;
        }

        var addModalW = document.getElementById("addModalW");
        var editModalW = document.getElementById("editModalW");
        var deleteModalW = document.getElementById("deleteModalW");


        $scope.addW = function () {
          addModalW.style.display = "block";
        };
        $scope.addWClose = function (response) {
          if (response) {
            console.log($scope.newUser)
          }
          addModalW.style.display = "none";
        }

        $scope.editW = function () {
          editModalW.style.display = "block";

        };
        $scope.editWClose = function (response) {
          if (response) {
            console.log($scope.user)
          }
          editModalW.style.display = "none";
        }

        $scope.deleteW = function () {
          deleteModalW.style.display = "block";

        };
        $scope.deleteWClose = function (response) {
          if (response) {
            console.log("do something")

          }
          deleteModalW.style.display = "none";
        }

        var getWhiteList = function () {
          dataService.getWhiteList().then(
            function (response) {
              gridOptionsW.api.setRowData(response.data)
            },
            function (err) {
              $scope.status = 'Unable to load data ' + err;
            },
            function (notify) {
              console.log(notify);
            }
          );
        };
        getWhiteList();

        // Black List

        var columnDefsB = [
          // { headerName: "ID", field: "id", sortable: true, filter: true },
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true },
          { headerName: "Description", field: "description", sortable: true, filter: true },
        ];

        var rowDataB = []
        // var rowDataBold = [
        //   { id: 1, numberPlate: "QQ11 WER", description : "qwet rtrw etw retrwt wr" },
        //   { id: 2, numberPlate: "WW22 ASD", description : "fd ghshs dfhshf sfdsh" },
        //   { id: 3, numberPlate: "EE33 ZXC", description : "dfn gdsdbsbr seb" },
        // ];

        var gridOptionsB = {
          columnDefs: columnDefsB,
          rowData: rowDataB,
          rowSelection: 'single',
          onSelectionChanged: onSelectionChangedB,
          pagination: true,
          paginationPageSize: 10,
        };

        var eGridDivB = document.querySelector('#blackListGrid');
        new agGrid.Grid(eGridDivB, gridOptionsB);

        $scope.newBannedVehicle = {}
        $scope.bannedVehicle = {}

        function onSelectionChangedB() {
          var selectedRows = gridOptionsB.api.getSelectedRows();
          $scope.bannedVehicle = selectedRows[0];
          document.getElementById("editBtnB").disabled = false;
          document.getElementById("deleteBtnB").disabled = false;

          document.getElementById("editBtnW").disabled = true;
          document.getElementById("deleteBtnW").disabled = true;
        }

        var addModalB = document.getElementById("addModalB");
        var editModalB = document.getElementById("editModalB");
        var deleteModalB = document.getElementById("deleteModalB");


        $scope.addB = function () {
          addModalB.style.display = "block";
        };
        $scope.addBClose = function (response) {
          if (response) {
            console.log($scope.newBannedVehicle)
          }
          addModalB.style.display = "none";
        }

        $scope.editB = function () {
          editModalB.style.display = "block";
        };
        $scope.editBClose = function (response) {
          if (response) {
            console.log($scope.bannedVehicle)
            dataService.editBlackListVehicle($scope.bannedVehicle).then(
              function (response) {
                // TO DO: NOT UPDATING TABLE, TAKES TO LONG TO UPDATE????
                getBlackList();
              },
              function (err) {
                $scope.status = 'Unable to load data ' + err;
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          editModalB.style.display = "none";
        }

        $scope.deleteB = function () {
          deleteModalB.style.display = "block";

        };
        $scope.deleteBClose = function (response) {
          if (response) {
            console.log("do something")

          }
          deleteModalB.style.display = "none";
        }

        var getBlackList = function () {
          dataService.getBlackList().then(
            function (response) {
              console.log(response)
              gridOptionsB.api.setRowData(response.data)
            },
            function (err) {
              $scope.status = 'Unable to load data ' + err;
            },
            function (notify) {
              console.log(notify);
            }
          );
        };

        getBlackList();

      }
    ]
  )
