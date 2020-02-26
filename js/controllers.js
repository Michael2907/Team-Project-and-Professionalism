(function () {
    "use strict";

    angular.module('AssignmentApp').
        controller('IndexController',
            [
                '$scope',
                'dataService',
                'applicationData',
                '$location',
                function ($scope, dataService, applicationData, $location) {

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


                    // $('#myModal').on('shown.bs.modal', function () {
                    //     $('#myInput').trigger('focus')
                    //   })



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
        ).
        controller('LoginController',
            [
                '$scope',
                'dataService',
                'applicationData',
                '$location',
                function ($scope, dataService, applicationData, $location) {

                    $scope.showAdmin = true;
                    $scope.showGuest = false;

                    $scope.admin = {};
                    $scope.guest = {};

                    // document.getElementsByClassName("button1")[0].style.backgroundColor = '#4CAF50';
                    // document.getElementsByClassName("button1")[0].style.color = 'white';

                    // var button1 = document.getElementsByClassName("button1")[0].style;
                    // button1.backgroundColor = '#4CAF50';
                    // button1.color = 'white';


                    $scope.showAdminForm = function () {
                        $scope.showAdmin = true;
                        $scope.showGuest = false;

                        var button1 = document.getElementsByClassName("button1")[0].style;
                        button1.backgroundColor = '#4CAF50';
                        button1.color = 'white';

                        var button2 = document.getElementsByClassName("button2")[0].style;
                        button2.backgroundColor = 'white';
                        button2.color = 'black';
                        button2.border = '2px solid #008CBA'
                    }

                    $scope.showGuestForm = function () {
                        $scope.showAdmin = false;
                        $scope.showGuest = true;

                        var button1 = document.getElementsByClassName("button1")[0].style;
                        button1.backgroundColor = 'white';
                        button1.color = 'black';
                        button1.border = '2px solid #4CAF50'

                        var button2 = document.getElementsByClassName("button2")[0].style;
                        button2.backgroundColor = '#008CBA';
                        button2.color = 'white';

                    }

                    $scope.adminLogin = function () {
                        // Show
                        dataService.adminLogin($scope.admin).then(
                            function (response) {
                                console.log(response);
                            },
                            function (err) {
                                $scope.status = 'Unable to load data ' + err;
                            },
                            function (notify) {
                                console.log(notify);
                            }
                        );
                    };

                    $scope.guestLogin = function () {
                        // Show
                        dataService.guestLogin($scope.guest).then(
                            function (response) {
                                console.log(response);
                            },
                            function (err) {
                                $scope.status = 'Unable to load data ' + err;
                            },
                            function (notify) {
                                console.log(notify);
                            }
                        );
                    };

                }
            ]
        ).
        controller('AdminController',
            [
                '$scope',
                'dataService',
                'applicationData',
                '$location',
                function ($scope, dataService, applicationData, $location) {

                    // // specify the columns
                    // var columnDefs = [
                    //     { headerName: "Make", field: "make", sortable: true, filter: true },
                    //     { headerName: "Model", field: "model", sortable: true, filter: true },
                    //     { headerName: "Price", field: "price", sortable: true, filter: true }
                    // ];

                    // // specify the data
                    // var rowData = [
                    //     { make: "Toyota", model: "Celica", price: 35000 },
                    //     { make: "Ford", model: "Mondeo", price: 32000 },
                    //     { make: "Porsche", model: "Boxter", price: 72000 }
                    // ];

                    // // let the grid know which columns and what data to use
                    // var gridOptions = {
                    //     columnDefs: columnDefs,
                    //     rowData: rowData
                    // };

                    // // lookup the container we want the Grid to use
                    // var eGridDiv = document.querySelector('#myGrid');

                    // // create the grid passing in the div to use together with the columns & data we want to use
                    // new agGrid.Grid(eGridDiv, gridOptions);
                }
            ]
        )

}());