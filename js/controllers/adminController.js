
"use strict";

assignmentApp.
  controller('AdminController',
    [
      '$scope',
      'dataService',
      'applicationData',
      'authFact',
      function ($scope, dataService, applicationData, authFact) {
        
        // White List
        var columnDefsW = [
          { headerName: "ID", field: "userId", sortable: true, filter: true, resizable: true },
          { headerName: "Name", field: "username", sortable: true, filter: true, resizable: true },
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true, resizable: true },
          { headerName: "Email", field: "email", sortable: true, filter: true, resizable: true },
          { headerName: "User Group", field: "userGroup", sortable: true, filter: true, resizable: true, valueGetter: function(params) {
            // displays Admin or Standard rather than 1 or 2
            if(params.data.userGroup == 1){
              return "Admin";
            } 
            else {
              return "Standard";
            }
          }, },
        ];

        var rowDataW = [];

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
        
        $scope.jwtToken = "";
        $scope.jwtToken = authFact.getAccessToken();

        function onSelectionChangedW() {
          var selectedRows = gridOptionsW.api.getSelectedRows();
          $scope.user = selectedRows[0];

          if($scope.user.username == applicationData.info.username){ // dont allow user to edit themselves
            document.getElementById("editBtnW").disabled = true;
            document.getElementById("deleteBtnW").disabled = true;
            document.getElementById("suspiciousBtn").disabled = true;
            document.getElementById("editBtnB").disabled = true;
            document.getElementById("deleteBtnB").disabled = true;
          } else {
            document.getElementById("editBtnW").disabled = false;
            document.getElementById("deleteBtnW").disabled = false;
            document.getElementById("suspiciousBtn").disabled = false;
            document.getElementById("editBtnB").disabled = true;
            document.getElementById("deleteBtnB").disabled = true;
          }

        }

        var addModalW = document.getElementById("addModalW");
        var editModalW = document.getElementById("editModalW");
        var deleteModalW = document.getElementById("deleteModalW");
        var suspiciousModal = document.getElementById("suspiciousModal");
        var suspiciousResultsModal = document.getElementById("suspiciousResultsModal");

        $scope.addW = function () {
          addModalW.style.display = "block";
        };
        $scope.addWClose = function (response) {
          if (response) {
            $scope.newUser.password = null;
            $scope.newUser.userGroup= parseInt($scope.newUser.userGroup);
            dataService.addWhiteListVehicle($scope.newUser, $scope.jwtToken).then(
              function (response) {
                // updates the table
                getWhiteList($scope.jwtToken);                
              },
              function (err) {
                getWhiteList($scope.jwtToken);
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          // resets the varaible 
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
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          deleteModalW.style.display = "none";
        }

        var getWhiteList = function (jwtToken) {
          dataService.getWhiteList(jwtToken).then(
            function (response) {
             let filteredResponse = response.data.filter(user => user.deleted == false && user.userGroup != 3)
              gridOptionsW.api.setRowData(filteredResponse)
            },
            function (err) {
            },
            function (notify) {
              console.log(notify);
            }
          );
        };
        // calls on initialise
        getWhiteList($scope.jwtToken);

        $scope.suspicious = function () {
          suspiciousModal.style.display = "block";
        };
        $scope.suspiciousClose = function (response) {
          if (response) {
            dataService.checkSuspiciousVehicle($scope.user.numberPlate).then(
              function (response) {
                if(response.data){
                  $scope.suspiciousResponse = response.data;
                  suspiciousResultsModal.style.display = "block";
                }
              },
              function (err) {
                $scope.suspiciousResponseError = err.data.errors[0].detail;
                suspiciousResultsModal.style.display = "block";
              },
              function (notify) {
                console.log(notify);
              }
            );
          }
          suspiciousModal.style.display = "none";
        }

        $scope.suspiciousReultsClose = function () {
          // resets varibales 
          $scope.suspiciousResponse = undefined;
          $scope.suspiciousResponseError = undefined;
          suspiciousResultsModal.style.display = "none";
        };

        /////////////////////////    Black List     ///////////////////////////////

        var columnDefsB = [
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true, resizable: true },
          { headerName: "Description", field: "description", sortable: true, filter: true, resizable: true },
        ];

        var rowDataB = []

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
                getBlackList($scope.jwtToken);                
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
                // updates black list table
               getBlackList($scope.jwtToken);
              },
              function (err) {
               getBlackList($scope.jwtToken);
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
