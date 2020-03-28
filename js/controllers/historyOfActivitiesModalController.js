assignmentApp.controller("HistoryOfActivitiesModalController", function(
  dataService,
  $uibModal,
  $document
) {
  var $ctrl = this;
  // dataService
  //   .getActivities("2020-03-16T15:03:44.343Z", "2020-03-20T15:03:44.343Z")
  //   .then(res => {
  //     const {
  //       data: { data: activies }
  //     } = res;
  //     console.log(res);

  //   });
  var activies = [
    {
      activityID: 0,
      dateTimeEntered: "2020-03-16T15:03:44.343Z",
      dateTimeExited: "2020-03-16T15:03:44.343Z",
      userID: 0
    },
    {
      activityID: 1,
      dateTimeEntered: "2020-03-16T15:03:44.343Z",
      dateTimeExited: "2020-03-16T15:03:44.343Z",
      userID: 0
    },
    {
      activityID: 2,
      dateTimeEntered: "2020-03-17T15:03:44.343Z",
      dateTimeExited: "2020-03-17T15:03:44.343Z",
      userID: 0
    },
    {
      activityID: 3,
      dateTimeEntered: "2020-03-17T15:03:44.343Z",
      dateTimeExited: "2020-03-17T15:03:44.343Z",
      userID: 0
    },
    {
      activityID: 4,
      dateTimeEntered: "2020-03-18T15:03:44.343Z",
      dateTimeExited: "2020-03-18T15:03:44.343Z",
      userID: 0
    },
    {
      activityID: 5,
      dateTimeEntered: "2020-03-18T15:03:44.343Z",
      dateTimeExited: "2020-03-18T15:03:44.343Z",
      userID: 0
    },
    {
      activityID: 6,
      dateTimeEntered: "2020-03-19T15:03:44.343Z",
      dateTimeExited: "2020-03-19T15:03:44.343Z",
      userID: 0
    },
    {
      activityID: 7,
      dateTimeEntered: "2020-03-19T15:03:44.343Z",
      dateTimeExited: "2020-03-19T15:03:44.343Z",
      userID: 0
    },
    {
      activityID: 8,
      dateTimeEntered: "2020-03-19T15:03:44.343Z",
      dateTimeExited: "2020-03-19T15:03:44.343Z",
      userID: 0
    },
    {
      activityID: 9,
      dateTimeEntered: "2020-03-20T15:03:44.343Z",
      dateTimeExited: "2020-03-20T15:03:44.343Z",
      userID: 0
    }
  ];

  $ctrl.data = activies;

  $ctrl.animationsEnabled = true;

  $ctrl.format = "dd-MMMM-yyyy";

  $ctrl.setDate = function(year, month, day) {
    $ctrl.startDt = new Date(year, month, day);
    $ctrl.endDt = new Date(year, month, day);
  };

  $ctrl.dateOptions = {
    dateDisabled: disabled,
    formatYear: "yy",
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  $ctrl.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $ctrl.todaySDt = function() {
    $ctrl.startDt = new Date();
  };
  $ctrl.todaySDt();

  $ctrl.todayEDt = function() {
    $ctrl.endDt = new Date();
  };
  $ctrl.todayEDt();

  $ctrl.popup1 = {
    opened: false
  };
  $ctrl.popup2 = {
    opened: false
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

  $ctrl.open = function(size, parentSelector) {
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
      controller: "ModalInstanceCtrl",
      controllerAs: "$ctrl",
      size: size,
      appendTo: parentElem,
      resolve: {
        data: function() {
          return $ctrl.data;
        },
        format: function() {
          return $ctrl.format;
        },
        startDt: function() {
          return $ctrl.startDt;
        },
        endDt: function() {
          return $ctrl.endDt;
        },
        popup1: function() {
          return $ctrl.popup1;
        },
        popup2: function() {
          return $ctrl.popup2;
        }
      }
    });

    modalInstance.result.then(
      function(selectedItem) {
        $ctrl.selected = selectedItem;
      },
      function() {
        $log.info("Modal dismissed at: " + new Date());
      }
    );
  };

  $ctrl.openComponentModal = function() {
    $uibModal.open({
      animation: $ctrl.animationsEnabled,
      component: "historyOfActivitiesComponent",
      resolve: {
        data: function() {
          return $ctrl.data;
        },
        format: function() {
          return $ctrl.format;
        },
        startDt: function() {
          return $ctrl.startDt;
        },
        endDt: function() {
          return $ctrl.endDt;
        },
        popup1: function() {
          return $ctrl.popup1;
        },
        popup2: function() {
          return $ctrl.popup2;
        }
      }
    });
  };

  $ctrl.toggleAnimation = function() {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

assignmentApp.controller("ModalInstanceCtrl", function(
  $uibModalInstance,
  data,
  format,
  startDt,
  endDt,
  popup1,
  popup2
) {
  var $ctrl = this;

  $ctrl.data = data;
  $ctrl.format = format;
  $ctrl.startDt = startDt;
  $ctrl.endDt = endDt;
  $ctrl.popup1 = popup1;
  $ctrl.popup2 = popup2;

  $ctrl.ok = function() {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function() {
    $uibModalInstance.dismiss("cancel");
  };

  $ctrl.open1 = function() {
    console.log("is it here");
    $ctrl.popup1.opened = true;
  };
  $ctrl.open2 = function() {
    console.log("is it here");
    $ctrl.popup2.opened = true;
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

assignmentApp.component("historyOfActivitiesComponent", {
  templateUrl: "historyOfActivitiesContent.html",
  bindings: {
    resolve: "<",
    close: "&",
    dismiss: "&"
  },
  controller: function() {
    var $ctrl = this;

    $ctrl.$onInit = function() {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.selected = {
        item: $ctrl.items[0]
      };
    };

    $ctrl.ok = function() {
      $ctrl.close({ $value: $ctrl.selected.item });
    };

    $ctrl.cancel = function() {
      $ctrl.dismiss({ $value: "cancel" });
    };
  }
});
