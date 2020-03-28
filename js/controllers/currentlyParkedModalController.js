assignmentApp.controller("CurrentlyParkedModalController", function(
  dataService,
  $uibModal,
  $document
) {
  var $cp = this;
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

  $cp.data = activies.length;

  $cp.animationsEnabled = true;

  $cp.open = function(size, parentSelector) {
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
      controller: "ModalInstanceCtrl",
      controllerAs: "$cp",
      size: size,
      appendTo: parentElem,
      resolve: {
        data: function() {
          return $cp.data;
        }
      }
    });

    modalInstance.result.then(
      function(selectedItem) {
        $cp.selected = selectedItem;
      },
      function() {
        $log.info("Modal dismissed at: " + new Date());
      }
    );
  };

  $cp.openComponentModal = function() {
    $uibModal.open({
      animation: $cp.animationsEnabled,
      component: "currentlyParkedComponent",
      resolve: {
        data: function() {
          return $cp.data;
        }
      }
    });
  };

  $cp.toggleAnimation = function() {
    $cp.animationsEnabled = !$cp.animationsEnabled;
  };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

assignmentApp.controller("ModalInstanceCtrl", function(
  $uibModalInstance,

  data
) {
  var $cp = this;

  $cp.data = data;

  $cp.ok = function() {
    $uibModalInstance.close($cp.selected.item);
  };

  $cp.cancel = function() {
    $uibModalInstance.dismiss("cancel");
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

assignmentApp.component("currentlyParkedComponent", {
  templateUrl: "currentlyParkedContent.html",
  bindings: {
    resolve: "<",
    close: "&",
    dismiss: "&"
  },
  controller: function() {
    var $cp = this;

    $cp.$onInit = function() {
      $cp.items = $cp.resolve.items;
      $cp.selected = {
        item: $cp.items[0]
      };
    };

    $cp.ok = function() {
      $cp.close({ $value: $cp.selected.item });
    };

    $cp.cancel = function() {
      $cp.dismiss({ $value: "cancel" });
    };
  }
});
