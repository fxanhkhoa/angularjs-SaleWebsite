'use strict';

angular.module('Signup')

.factory('SignupService',
    ['$http', '$rootScope', '$location',
    function($http, $rootScope, $location){
        var service = {};
        
        service.Signup = function (email, password, fullname, occupation, callback){
            var encrypt_pass = CryptoJS.MD5(password).toString();
            var data = {
                email: email,
                password: encrypt_pass,
                name: fullname,
                occupation: occupation,
                role: "NONE"
            };

            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            }

            var url = "http://" + $location.host() + ":8000/signup/";
            $http.post(url, JSON.stringify(data), config)
            .then(
                function(response){ // Send success
                    // console.log("Success");
                    // console.log("Response = " + response.data);
                    if (response.data == 1){
                        response.success = true;
                        response.message = "Đăng ký thành công";
                    }
                    else{
                        response.success = false;
                        response.message = "Đã tồn tại hoặc lỗi";
                    }
                    callback(response);
                }, 
                function(response){ // Send fail
                    // console.log("Fail");
                    response.success = false;
                    response.message = "Không thể đăng ký";
                    callback(response);
                });
        }
        return service;
    }]);
