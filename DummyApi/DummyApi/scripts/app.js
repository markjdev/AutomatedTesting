var app = angular.module('productsApp', []);

app.controller('productsCtrl', function productsCtrl($scope) {
    $scope.products = [
        { "id": 1, "name": "Widget" },
        { "id": 2, "name": "Sprocket" },
    ];
    $scope.showEditor = false;
    $scope.product = {};

    $scope.beginEdit = function (id) {
        
        $scope.product = {};
        if (id == -1) {
            $scope.showEditor = true;
        }
        else {
            for (var i = 0; i < $scope.products.length; i++) {
                if ($scope.products[i].id == id) {
                    $scope.product = $scope.products[i];
                    $scope.showEditor = true;
                    break;
                }
            }
        }
    }

    $scope.hideEditor = function () {

        $scope.product = {};
        $scope.showEditor = false;
    }

    $scope.add = function () {

        if ($scope.product.name !== undefined && $scope.product.name != '') {

            // TODO: Save/update
            if ($scope.product.id === undefined) {
                $scope.product.id = $scope.products.length + 1;
                $scope.products.push($scope.product);
            }

            //$scope.product = {};
            $scope.showEditor = false;
        }
    }

    $scope.delete = function (id) {
        for (var i = 0; i < $scope.products.length;i++) {
            if ($scope.products[i].id == id) {
                $scope.products.splice(i,1);
                break;
            }
        }
    }
});