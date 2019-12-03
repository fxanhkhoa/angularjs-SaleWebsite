'use strict';

angular.module('add_product', ['ngMaterial', 'toaster', 'ngAnimate'])

.controller('AddProductController',
    ['$scope', '$rootScope', '$mdSidenav', 'AddProductService','toaster',
    function ($scope, $rootScope, $mdSidenav, AddProductService, toaster) {
        console.log("Run Product Controller");
        $rootScope.isHide = true;
        $scope.toggleLeft = buildToggler('left');
        $scope.cb1 = false;

        $scope.product_type = [
            {value: "nuocuong", text: "Nước Uống"},
            {value: "banhkeo", text: "Bánh Kẹo"},
            {value: "thuocla", text: "Thuốc Lá"}
        ];

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            };
        }

        $rootScope.closenav = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close();
        };

        $rootScope.onChange = function(cbState) {
            $scope.message = cbState;
            $mdSidenav('left').toggle();
            // console.log(cbState);
            if (cbState){
                // $rootScope.swtStyle = {
                //     "padding-left" : "200px"
                // };
            }
            else{
                // $rootScope.swtStyle = {
                //     "padding-left" : "0px"
                // };
            }
        };

        $scope.add_product_submit = function(){
            console.log("Submited");
            $scope.dataLoading = true;
            console.log($scope.product.type);
            AddProductService.Add(
                $scope.product.barcode,
                $scope.product.type,
                $scope.product.name,
                $scope.product.price_main,
                $scope.product.price1,
                $scope.product.price2,
                $scope.product.price3,
                $scope.product.quantity,
                $scope.product.expiredday, 
                function(response){
                if(response.success) {
                    // $scope.error = response.message;
                    $scope.dataLoading = false;
                    $scope.style = "text-success";
                    toaster.pop({
                        type: 'success',
                        title: 'Thêm sản phẩm',
                        body: response.message,
                        timeout: 3000
                    });
                } else {
                    // $scope.error = response.message;
                    $scope.dataLoading = false;
                    $scope.style = "text-danger";
                    toaster.pop({
                        type: 'error',
                        title: 'Thêm sản phẩm',
                        body: response.message,
                        timeout: 3000
                    });
                }
            });
        };
    }]);