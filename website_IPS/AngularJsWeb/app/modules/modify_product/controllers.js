'use strict';

angular.module('modify_product', ['ngMaterial', 'toaster', 'ngAnimate'])

.controller('ModifyProductController',
    ['$scope', '$rootScope', '$mdSidenav', 'ModifyProductService','toaster', '$routeParams', '$location', '$mdDialog',
    function ($scope, $rootScope, $mdSidenav, ModifyProductService, toaster, $routeParams, $location, $mdDialog) {
        console.log("Run Product_Modify Controller");
        $rootScope.isHide = true;
        $scope.toggleLeft = buildToggler('left');
        $scope.cb1 = false;
        var barcode = $routeParams.barcode;
        init(barcode);

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

        function init(barcode){
            ModifyProductService.FindWithBarcode(barcode, function(response){
            if(response.success) {
                // $scope.error = response.message;
                $scope.dataLoading = false;
                $scope.style = "text-success";
                $scope.product = response.data[0].fields; 
            } else {
                // $scope.error = response.message;
                $scope.dataLoading = false;
                $scope.style = "text-danger";
                console.log("fail");
            }
        })}

        $scope.modify_product_submit = function(){
            ModifyProductService.Modify(
                $scope.product.barcode,
                $scope.product.type,
                $scope.product.product_name,
                $scope.product.price_main,
                $scope.product.price1,
                $scope.product.price2,
                $scope.product.price3,
                $scope.product.quantity,
                $scope.product.expired_day,
                function(response){
                    if (response.success){
                        toaster.pop({
                            type: 'success',
                            title: 'Sửa sản phẩm',
                            body: response.message,
                            timeout: 3000
                        });
                    }
                    else{
                        toaster.pop({
                            type: 'error',
                            title: 'Sửa sản phẩm',
                            body: response.message,
                            timeout: 3000
                        });
                    }
                }
            );
        };

        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Bạn có chắc chắn muốn xóa không?')
                  .textContent('Điều này sẽ xóa tất cả thông tin của sản phẩm này')
                  .ariaLabel('Lucky day')
                  .targetEvent(ev)
                  .ok('Xóa!')
                  .cancel('Hủy');
        
            $mdDialog.show(confirm).then(function() {
                ModifyProductService.Remove(barcode, function(response){
                    if (response.success){
                        toaster.pop({
                            type: 'success',
                            title: 'Sửa sản phẩm',
                            body: response.message,
                            timeout: 3000
                        });
                        $location.path('/product_info/1');
                    }
                    else{
                        toaster.pop({
                            type: 'error',
                            title: 'Sửa sản phẩm',
                            body: response.message,
                            timeout: 3000
                        });
                    }
                });
            }, function() {
              $scope.status = 'Hủy';
            });
        };
    }]);