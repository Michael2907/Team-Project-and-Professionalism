
"use strict";

assignmentApp.
  controller('AdminController',
    [
      '$scope',
      'dataService',
      'applicationData',
      '$location',
      function () {

        // White List

        var columnDefsW = [
          { headerName: "ID", field: "id", sortable: true, filter: true },
          { headerName: "Name", field: "name", sortable: true, filter: true },
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true },
          { headerName: "User Group", field: "userGroup", sortable: true, filter: true },
        ];
        var rowDataW = [
          { id: 1, name: "Michael Clayton", numberPlate: "QQ11 WER", userGroup: "Admin" },
          { id: 2, name: "Jordan Marshall", numberPlate: "WW22 ASD", userGroup: "Standard" },
          { id: 3, name: "Jack O'Carroll", numberPlate: "EE33 ZXC", userGroup: "Guest" },
        ];
        var gridOptionsW = {
          columnDefs: columnDefsW,
          rowData: rowDataW,
          rowSelection: 'single',
          pagination: true,
          paginationPageSize: 10,

        };
        var eGridDivW = document.querySelector('#whiteListGrid');
        new agGrid.Grid(eGridDivW, gridOptionsW);

        // Black List

        var columnDefsB = [
          { headerName: "ID", field: "id", sortable: true, filter: true },
          { headerName: "Number Plate", field: "numberPlate", sortable: true, filter: true },
        ];
        var rowDataB = [
          { id: 1, numberPlate: "QQ11 WER" },
          { id: 2, numberPlate: "WW22 ASD" },
          { id: 3, numberPlate: "EE33 ZXC" },
        ];
        var gridOptionsB = {
          columnDefs: columnDefsB,
          rowData: rowDataB,
          rowSelection: 'single',
          pagination: true,
          paginationPageSize: 10,

        };
        var eGridDivB = document.querySelector('#blackListGrid');
        new agGrid.Grid(eGridDivB, gridOptionsB);

      }
    ]
  )
