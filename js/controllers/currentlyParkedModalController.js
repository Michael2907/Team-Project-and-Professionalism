assignmentApp.controller("CurrentlyParkedModalController", function (
  dataService,
  $uibModal,
  $document,
  authFact
) {
  var $cp = this;

  $cp.getActivities = function () {
    return dataService
      .getCurrentlyParked(authFact.getAccessToken())
      .then((res) => {
        const {
          data: { data: activities },
        } = res;

        return activities.map((activity) => {
          return {
            activityID: activity.activity.activityID,
            username: activity.user.username,
            numberPlate: activity.user.numberPlate,
            dateTimeEntered: activity.activity.dateTimeEntered,
            dateTimeExited: activity.activity.dateTimeExited,
          };
        });
      });
  };

  var cpColumnDefs = [
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
  ];

  $cp.rowData = [];

  $cp.animationsEnabled = true;

  $cp.cpGridOptions = (rowData) => {
    return {
      columnDefs: cpColumnDefs,
      rowData: rowData,
      pagination: true,
      paginationPageSize: 10,
    };
  };

  $cp.open = function (size, parentSelector) {
    var parentElem = parentSelector
      ? angular.element(
          $document[0].querySelector(".modal-demo " + parentSelector)
        )
      : undefined;
    var modalInstance = $uibModal.open({
      animation: $cp.animationsEnabled,
      ariaLabelledBy: "currentlyParkedTitle",
      ariaDescribedBy: "currentlyParkedBody",
      templateUrl: "currentlyParkedContent.html",
      controller: "cpModalInstanceCtrl",
      controllerAs: "$cp",
      size: size,
      appendTo: parentElem,
      resolve: {
        data: function () {
          return $cp.data;
        },
      },
    });
    modalInstance.rendered.then(() => {
      $cp.getActivities().then((rowData) => {
        var cpGridDivB = document.querySelector("#cpGrid");
        var options = $cp.cpGridOptions(rowData);

        new agGrid.Grid(cpGridDivB, options);
      });
    });
  };

  $cp.openComponentModal = function () {
    $uibModal.open({
      animation: $cp.animationsEnabled,
      component: "currentlyParkedComponent",
      resolve: {
        data: function () {
          return $cp.data;
        },
      },
    });
  };

  $cp.toggleAnimation = function () {
    $cp.animationsEnabled = !$cp.animationsEnabled;
  };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

assignmentApp.controller("cpModalInstanceCtrl", function (
  $uibModalInstance,
  data
) {
  var $cp = this;

  $cp.data = data;

  $cp.ok = function () {
    $uibModalInstance.close();
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

assignmentApp.component("currentlyParkedComponent", {
  templateUrl: "currentlyParkedContent.html",
  bindings: {
    resolve: "<",
    close: "&",
    dismiss: "&",
  },
  controller: function () {
    var $cp = this;

    $cp.ok = function () {
      $cp.close();
    };
  },
});
