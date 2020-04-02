
"use strict";

assignmentApp.
  controller('AdminController',
    [
      '$scope',
      'dataService',
      'authFact',
      'applicationData',
      '$location',
      
      function ($scope, dataService, authFact) {
        // White List

        var columnDefsW = [
          { headerName: "ID", field: "userId", sortable: true, filter: true, resizable: true },
          { headerName: "Name", field: "username", sortable: true, filter: true, resizable: true },
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true, resizable: true },
          { headerName: "Email", field: "email", sortable: true, filter: true, resizable: true },
          { headerName: "User Group", field: "userGroup", sortable: true, filter: true, resizable: true },
        ];

        var rowDataW = [];
        // var rowDataW = [
        //   { userId: 1, username: "Michael Clayton", numberPlate: "QQ11 WER", email:"asdadas@Asdasdsa" , userGroup: "admin" },
        //   { userId: 2, username: "Jordan Marshall", numberPlate: "WW22 ASD", email:"asdadas@Asdasdsa", userGroup: "standard" },
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

        var allColumnIdsW = [];
        gridOptionsW.columnApi.getAllColumns().forEach(function(column) {
          allColumnIdsW.push(column.colId);
        });
        gridOptionsW.columnApi.autoSizeColumns(allColumnIdsW, false);


        $scope.newUser = {
          userGroup: "1"
        }
        $scope.user = {
          userGroup: "1"
        }
        
        $scope.jwtToken = ""
        $scope.jwtToken = authFact.getAccessToken();

        function onSelectionChangedW() {
          var selectedRows = gridOptionsW.api.getSelectedRows();
          $scope.user = selectedRows[0];
          document.getElementById("editBtnW").disabled = false;
          document.getElementById("deleteBtnW").disabled = false;
          document.getElementById("suspiciousBtn").disabled = false;


          document.getElementById("editBtnB").disabled = true;
          document.getElementById("deleteBtnB").disabled = true;
        }

        var addModalW = document.getElementById("addModalW");
        var editModalW = document.getElementById("editModalW");
        var deleteModalW = document.getElementById("deleteModalW");
        var suspiciousModal = document.getElementById("suspiciousModal");


        $scope.addW = function () {
          addModalW.style.display = "block";
        };
        $scope.addWClose = function (response) {
          if (response) {
            $scope.newUser.password = null;
            $scope.newUser.userGroup= parseInt($scope.newUser.userGroup);
            dataService.addWhiteListVehicle($scope.newUser, $scope.jwtToken).then(
              function (response) {
                getWhiteList($scope.jwtToken);
                
              },
              function (err) {
                $scope.status = 'Unable to load data ' + err;
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          $scope.newUser = {
            userGroup: "1"
          }
          addModalW.style.display = "none";
        }

        $scope.editW = function () {
          $scope.user.userGroup = $scope.user.userGroup.toString();
          editModalW.style.display = "block";

        };
        $scope.editWClose = function (response) {
          if (response) {
            $scope.user.userGroup= parseInt($scope.user.userGroup);
            dataService.updateWhiteListVehicle($scope.user, $scope.jwtToken).then(
              function (response) {
                getWhiteList($scope.jwtToken);
                
              },
              function (err) {
                getWhiteList($scope.jwtToken);

                $scope.status = 'Unable to load data ' + err;
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          editModalW.style.display = "none";
        }

        $scope.deleteW = function () {
          deleteModalW.style.display = "block";

        };
        $scope.deleteWClose = function (response) {
          if (response) {
            $scope.user.deleted = true;
            dataService.updateWhiteListVehicle($scope.user, $scope.jwtToken).then(
              function (response) {
                getWhiteList($scope.jwtToken);
              },
              function (err) {
                getWhiteList($scope.jwtToken);
                $scope.status = 'Unable to load data ' + err;
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          deleteModalW.style.display = "none";
        }

        var getWhiteList = function (jwtToken) {
          dataService.getWhiteList(jwtToken, $scope.jwtToken).then(
            function (response) {
             let filteredResponse = response.data.filter(user => user.deleted == false && user.userGroup != 3)
              gridOptionsW.api.setRowData(filteredResponse)
            },
            function (err) {
              $scope.status = 'Unable to load data ' + err;
            },
            function (notify) {
              console.log(notify);
            }
          );
        };
        getWhiteList($scope.jwtToken);



        $scope.suspicious = function () {
          suspiciousModal.style.display = "block";
        };
        $scope.suspiciousClose = function (response) {
          if (response) {
            dataService.checkSuspiciousVehicle($scope.user.numberPlate).then(
              function (response) {
               
              },
              function (err) {
                $scope.status = 'Unable to load data ' + err;
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          suspiciousModal.style.display = "none";
        }

        /////////////////////////    Black List     ///////////////////////////////

        var columnDefsB = [
          // { headerName: "ID", field: "id", sortable: true, filter: true },
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true, resizable: true },
          { headerName: "Description", field: "description", sortable: true, filter: true, resizable: true },
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

        var allColumnIdsB = [];
        gridOptionsB.columnApi.getAllColumns().forEach(function(column) {
            allColumnIdsB.push(column.colId);
        });
        gridOptionsB.columnApi.autoSizeColumns(allColumnIdsB, false);

        $scope.newBannedVehicle = {}
        $scope.bannedVehicle = {}

        function onSelectionChangedB() {
          var selectedRows = gridOptionsB.api.getSelectedRows();
          $scope.bannedVehicle = selectedRows[0];
          document.getElementById("editBtnB").disabled = false;
          document.getElementById("deleteBtnB").disabled = false;

          document.getElementById("editBtnW").disabled = true;
          document.getElementById("deleteBtnW").disabled = true;
          document.getElementById("suspiciousBtn").disabled = true;
        }

        var addModalB = document.getElementById("addModalB");
        var editModalB = document.getElementById("editModalB");
        var deleteModalB = document.getElementById("deleteModalB");


        $scope.addB = function () {
          addModalB.style.display = "block";
        };
        $scope.addBClose = function (response) {
          if (response) {
            dataService.addBlackListVehicle($scope.newBannedVehicle, $scope.jwtToken).then(
              function (response) {
                getBlackList($scope.jwtToken);
                
              },
              function (err) {
                $scope.status = 'Unable to load data ' + err;
              },
              function (notify) {
                console.log(notify);
              }
            );

          }
          $scope.newBannedVehicle = {}

          addModalB.style.display = "none";
        }

        $scope.editB = function () {
          editModalB.style.display = "block";
        };
        $scope.editBClose = function (response) {
          if (response) {
            dataService.editBlackListVehicle($scope.bannedVehicle, $scope.jwtToken).then(
              function (response) {
               getBlackList($scope.jwtToken);
              },
              function (err) {
               getBlackList($scope.jwtToken);

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
            dataService.deleteBlackListVehicle($scope.bannedVehicle.numberPlate, $scope.jwtToken).then(
              function (response) {
               getBlackList($scope.jwtToken);
              },
              function (err) {
               getBlackList($scope.jwtToken);
                $scope.status = 'Unable to load data ' + err;
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          deleteModalB.style.display = "none";
        }

        var getBlackList = function (jwtToken) {
          dataService.getBlackList(jwtToken).then(
            function (response) {
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
       getBlackList($scope.jwtToken);

      }
    ]
  )
