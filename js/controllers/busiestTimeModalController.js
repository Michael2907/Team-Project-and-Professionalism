assignmentApp.controller("BusiestTimeModalController", function (
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
        console.log(res);

        console.log("activities", activities);
        var activityHours = activities.map((a) =>
          new Date(a.activity.dateTimeEntered).getHours()
        );

        return [
          [
            activityHours.filter((hour) => hour === 9).length,
            activityHours.filter((hour) => hour === 10).length,
            activityHours.filter((hour) => hour === 11).length,
            activityHours.filter((hour) => hour === 12).length,
            activityHours.filter((hour) => hour === 13).length,
            activityHours.filter((hour) => hour === 14).length,
            activityHours.filter((hour) => hour === 15).length,
            activityHours.filter((hour) => hour === 16).length,
            activityHours.filter((hour) => hour === 17).length,
          ],
        ];
      });
  };

  $ctrl.animationsEnabled = true;

  $ctrl.labels = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  $ctrl.series = ["Hours of the day"];

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
      ariaLabelledBy: "busiestTimeTitle",
      ariaDescribedBy: "busiestTimeBody",
      templateUrl: "busiestTimeContent.html",
      controller: "BTModalInstanceCtrl",
      controllerAs: "$ctrl",
      size: size,
      appendTo: parentElem,
      resolve: {
        series: function () {
          return $ctrl.series;
        },
        labels: function () {
          return $ctrl.labels;
        },
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
      },
    });
  };

  $ctrl.openComponentModal = function () {
    $uibModal.open({
      animation: $ctrl.animationsEnabled,
      component: "busiestTimeComponent",
      resolve: {
        series: function () {
          return $ctrl.series;
        },
        labels: function () {
          return $ctrl.labels;
        },
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

assignmentApp.controller("BTModalInstanceCtrl", function (
  $uibModalInstance,
  series,
  labels,
  data,
  format,
  startDt,
  endDt,
  popup1,
  popup2,
  getActivities
) {
  var $ctrl = this;

  $ctrl.series = series;
  $ctrl.labels = labels;
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
    console.log("is it here");
    $ctrl.popup1.opened = true;
  };

  $ctrl.open2 = function () {
    console.log("is it here");
    $ctrl.popup2.opened = true;
  };

  $ctrl.getActivities = function () {
    var endDt = new Date($ctrl.startDt);
    endDt.setDate(endDt.getDate() + 1);
    getActivities($ctrl.startDt, endDt).then((activities) => {
      console.log("get activites", activities);
      $ctrl.data = activities;
    });
  };

  $ctrl.getActivities();
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

assignmentApp.component("busiestTimeComponent", {
  templateUrl: "busiestTimeContent.html",
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
