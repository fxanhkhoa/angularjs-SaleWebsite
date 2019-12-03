'use strict';
 
angular.module('product_info')

.factory('ProductInfoService',
        ['$http', '$rootScope', '$location',
        function($http, $rootScope, $location){
            var service = {};
            var quantity = 5;
            service.num_page = 0;
            service.Select = function(page, callback){
                var data = {
                    request: "find_number_product",
                    number_product: page,
                    quantity: quantity
                }; 

                var config = {
                    headers : {
                        'Content-Type': 'application/json;'
                    }
                }

                var url = "http://" + $location.host() + ":8000/product_injection/";
                $http.post(url, JSON.stringify(data), config)
                .then(
                    function(response){ // Send success
                        // console.log("Success");
                        // console.log("Response = " + response.data);
                        if (response.data != ""){
                            response.success = true;
                            response.message = "Thành công";
                        }
                        else{
                            response.success = false;
                            response.message = "Lỗi";
                        }
                        callback(response);
                    }, 
                    function(response){ // Send fail
                        // console.log("Fail");
                        response.success = false;
                        response.message = "Không thực hiện được";
                        callback(response);
                });
            };

            service.CountPage = function(callback){
                var data = {
                    request: "count_page",
                    quantity: quantity
                }; 

                var config = {
                    headers : {
                        'Content-Type': 'application/json;'
                    }
                }

                var url = "http://" + $location.host() + ":8000/product_injection/";
                $http.post(url, JSON.stringify(data), config)
                .then(
                    function(response){ // Send success
                        // console.log("Success");
                        // console.log("Response = " + response.data);
                        if (response.data != ""){
                            response.success = true;
                            response.message = "Thành công";
                            service.num_page = response.data;
                        }
                        else{
                            response.success = false;
                            response.message = "Lỗi";
                        }
                        callback(response);
                    }, 
                    function(response){ // Send fail
                        // console.log("Fail");
                        response.success = false;
                        response.message = "Không thực hiện được";
                        callback(response);
                });
            };

            return service;
        }]);