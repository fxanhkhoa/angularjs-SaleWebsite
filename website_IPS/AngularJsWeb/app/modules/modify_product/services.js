'use strict';
 
angular.module('modify_product')

.factory('ModifyProductService',
        ['$http', '$rootScope', '$location',
        function($http, $rootScope, $location){
            var service = {};

            service.FindWithBarcode = function(barcode, callback){
               var data = {
                  request: "find_with_barcode",
                  barcode: barcode,
              };

              var config = {
                  headers : {
                      'Content-Type': 'application/json;'
                  }
              }
              // JSON.stringify(data)
              var url = "http://" + $location.host() + ":8000/product_injection/";
              $http.post(url, JSON.stringify(data), config)
              .then(
                  function(response){ // Send success
                      // console.log("Success");
                      // console.log("Response = " + response.data);
                      if (response.data){
                          response.success = true;
                          response.message = "Thành công";
                      }
                      else if (response.data == 0){
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

            service.Modify = function(barcode, type, product_name, price_main,
                price1, price2, price3, quantity, expired_day, callback){
                
                if (!price1){
                    price1 = "";
                }
                if (!price2){
                    price2 = "";
                }
                if (!price3){
                    price3 = "";
                }
                if (!quantity){
                    quantity = 0;
                }
                if (!expired_day){
                    expired_day = "1/1/2099"
                }

                var data = {
                    request: "modify",
                    barcode: barcode,
                    type: type,
                    product_name: product_name,
                    price_main: price_main,
                    price1: price1,
                    price2: price2,
                    price3: price3,
                    quantity: quantity,
                    expired_day: expired_day
                };

                var config = {
                    headers : {
                        'Content-Type': 'application/json;'
                    }
                }
                // JSON.stringify(data)
                var url = "http://" + $location.host() + ":8000/product_injection/";
                $http.post(url, JSON.stringify(data), config)
                .then(
                    function(response){ // Send success
                        // console.log("Success");
                        // console.log("Response = " + response.data);
                        if (response.data == 1){
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

            service.Remove = function(barcode, callback){
                var data = {
                   request: "remove_with_barcode",
                   barcode: barcode,
               };
 
               var config = {
                   headers : {
                       'Content-Type': 'application/json;'
                   }
               }
               // JSON.stringify(data)
               var url = "http://" + $location.host() + ":8000/product_injection/";
               $http.post(url, JSON.stringify(data), config)
               .then(
                   function(response){ // Send success
                       // console.log("Success");
                       // console.log("Response = " + response.data);
                       if (response.data == 1){
                           response.success = true;
                           response.message = "Thành công";
                       }
                       else if (response.data == 0){
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