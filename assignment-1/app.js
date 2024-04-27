(function() {
    "use strict";

    angular.module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.message = "";
        $scope.foodList = "";
        $scope.checkFood = function() {
            if ($scope.foodList == '') {
                $scope.message = "Please enter data first";
                return;
            }

            if (list.length > 3) {
                $scope.message = "Too much!"
            } else {
                $scope.message = "Enjoy!";
            }
        };

    }
})();
