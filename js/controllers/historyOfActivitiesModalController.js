assignmentApp.controller("HistoryOfActivitiesModalController", function (
  dataService,
  $uibModal,
  $document,
  authFact
) {
  var $ctrl = this;

  $ctrl.getActivities = function (startDt, endDt) {
    return dataService
      .getActivities(startDt, endDt, authFact.getAccessToken())
      .then((res) => {
        const {
          data: { data: activities },
        } = res;

        return activities.map((activity) => {
          return {
            activityID: activity.activity.activityID,
            username: activity.user.username,
            numberPlate: activity.user.numberplate,
            dateTimeEntered: activity.activity.dateTimeEntered,
            dateTimeExited: activity.activity.dateTimeExited,
          };
        });
      });
  };

  var hoaColumnDefs = [
    {
      headerName: "ID",
      field: "activityID",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Name",
      field: "username",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Number Plate",
      field: "numberPlate",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Time Entered",
      field: "dateTimeEntered",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Time Exited",
      field: "dateTimeExited",
      sortable: true,
      filter: true,
      resizable: true,
    },
  ];

  $ctrl.hoaGridOptions = (rowData) => {
    return {
      columnDefs: hoaColumnDefs,
      rowData: rowData,
      pagination: true,
      paginationPageSize: 10,
    };
  };

  $ctrl.animationsEnabled = true;

  $ctrl.format = "dd-MMMM-yyyy";

  $ctrl.setDate = function (year, month, day) {
    $ctrl.startDt = new Date(year, month, day);
    $ctrl.endDt = new Date(year, month, day);
  };

  $ctrl.dateOptions = {
    dateDisabled: disabled,
    formatYear: "yy",
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1,
  };

  $ctrl.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true,
  };

  $ctrl.todaySDt = function () {
    $ctrl.startDt = new Date();
  };
  $ctrl.todaySDt();

  $ctrl.todayEDt = function () {
    $ctrl.endDt = new Date();
  };
  $ctrl.todayEDt();

  $ctrl.popup1 = {
    opened: false,
  };
  $ctrl.popup2 = {
    opened: false,
  };

  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === "day" && (date.getDay() === 0 || date.getDay() === 6);
  }

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === "day") {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $ctrl.events.length; i++) {
        var currentDay = new Date($ctrl.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $ctrl.events[i].status;
        }
      }
    }

    return "";
  }

  $ctrl.open = function (size, parentSelector) {
    var parentElem = parentSelector
      ? angular.element(
          $document[0].querySelector(".modal-demo " + parentSelector)
        )
      : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: "historyOfActivitiesTitle",
      ariaDescribedBy: "historyOfActivitiesBody",
      templateUrl: "historyOfActivitiesContent.html",
      controller: "HOAModalInstanceCtrl",
      controllerAs: "$ctrl",
      size: size,
      appendTo: parentElem,
      resolve: {
        data: function () {
          return $ctrl.data;
        },
        format: function () {
          return $ctrl.format;
        },
        startDt: function () {
          return $ctrl.startDt;
        },
        endDt: function () {
          return $ctrl.endDt;
        },
        popup1: function () {
          return $ctrl.popup1;
        },
        popup2: function () {
          return $ctrl.popup2;
        },
        getActivities: function () {
          return $ctrl.getActivities;
        },
        hoaGridOptions: function () {
          return $ctrl.hoaGridOptions;
        },
      },
    });
    modalInstance.rendered.then(() => {
      $ctrl.getActivities($ctrl.startDt, $ctrl.endDt).then((rowData) => {
        var eGridDivB = document.querySelector("#hoaGrid");
        var options = $ctrl.hoaGridOptions(rowData);

        new agGrid.Grid(eGridDivB, options);
      });
    });
  };

  $ctrl.openComponentModal = function () {
    $uibModal.open({
      animation: $ctrl.animationsEnabled,
      component: "historyOfActivitiesComponent",
      resolve: {
        data: function () {
          return $ctrl.data;
        },
        format: function () {
          return $ctrl.format;
        },
        startDt: function () {
          return $ctrl.startDt;
        },
        endDt: function () {
          return $ctrl.endDt;
        },
        popup1: function () {
          return $ctrl.popup1;
        },
        popup2: function () {
          return $ctrl.popup2;
        },
      },
    });
  };

  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

assignmentApp.controller("HOAModalInstanceCtrl", function (
  $uibModalInstance,
  data,
  format,
  startDt,
  endDt,
  popup1,
  popup2,
  getActivities,
  hoaGridOptions
) {
  var $ctrl = this;

  $ctrl.data = data;
  $ctrl.format = format;
  $ctrl.startDt = startDt;
  $ctrl.endDt = endDt;
  $ctrl.popup1 = popup1;
  $ctrl.popup2 = popup2;

  $ctrl.ok = function () {
    $uibModalInstance.close();
  };

  $ctrl.open1 = function () {
    $ctrl.popup1.opened = true;
  };
  $ctrl.open2 = function () {
    $ctrl.popup2.opened = true;
  };

  $ctrl.getActivities = function () {
    getActivities($ctrl.startDt, $ctrl.endDt).then((rowData) => {
      var eGridDivB = document.querySelector("#hoaGrid");
      var options = hoaGridOptions(rowData);
      eGridDivB.removeChild(eGridDivB.childNodes[0]);

      new agGrid.Grid(eGridDivB, options);
    });
  };
  $ctrl.getActivities();
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

assignmentApp.component("historyOfActivitiesComponent", {
  templateUrl: "historyOfActivitiesContent.html",
  bindings: {
    resolve: "<",
    close: "&",
    dismiss: "&",
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.ok = function () {
      $ctrl.close();
    };
  },
});
