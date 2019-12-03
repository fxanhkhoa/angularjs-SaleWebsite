'use strict';

angular.module('product_info', ['ngMaterial', 'ui.bootstrap', 'ngAnimate'])

.controller('ProductInfoController',
    ['$scope', '$rootScope', '$mdSidenav', 'ProductInfoService', '$routeParams',
    function ($scope, $rootScope, $mdSidenav, ProductInfoService, $routeParams) {
        console.log("Run Product_info Controller");
        $rootScope.isHide = true;
        $scope.toggleLeft = buildToggler('left');
        $scope.cb1 = false;
        var current_page = Number($routeParams.page);
        $scope.current_page = current_page;
        init($routeParams.page);

        function get() {
            
            // console.log(list_number);
            return list_number;   
        }

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

        function init(page){
            ProductInfoService.Select(page, function(response){
                if(response.success) {
                    $scope.items = response.data;
                    // console.log(response.data[0].fields.barcode);
                    // $scope.error = response.message;
                    $scope.dataLoading = false;
                    $scope.style = "text-success";
                } else {
                    // $scope.error = response.message;
                    $scope.dataLoading = false;
                    $scope.style = "text-danger";
                }
            });

            ProductInfoService.CountPage(function(response){
                if(response.success) {
                    // $scope.error = response.message;
                    $rootScope.num_page = ProductInfoService.num_page;
                    ////// Pagination //////
                    var list_number = [];
                    var each_page = {
                        link: "",
                        number: 0
                    };
                    if ((current_page - 1) != 0){
                        var number = "<<";
                        var link = "/app/index.html#!/product_info/" + String(current_page - 1);
                        list_number.push({number, link});
                    }
                    for (var i = current_page - 3; i < current_page; i++){
                        if (i >= 1){
                            var number = String(i);
                            var link = "/app/index.html#!/product_info/" + String(i);
                            list_number.push({number, link});
                        }
                    }
                    for (var i = current_page ; i <= current_page + 3; i++){
                        if (i <= $rootScope.num_page){
                            var number = String(i);
                            var link = "/app/index.html#!/product_info/" + String(i);
                            list_number.push({number, link});
                        }
                    }
                    if ((current_page + 1) <= Number(ProductInfoService.num_page)){
                        var number = ">>";
                        var link = "/app/index.html#!/product_info/" + String(current_page + 1);
                        list_number.push({number, link});
                    }
                    $scope.list_number = list_number;

                } else {
                    // $scope.error = response.message;
                    $scope.dataLoading = false;
                    $scope.style = "text-danger";
                }
            });
        }
    }]);