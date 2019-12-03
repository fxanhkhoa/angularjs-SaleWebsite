'use strict';

angular.module('Signup', ['vcRecaptcha'])

.controller('SignupController',
    ['$scope', '$rootScope', 'SignupService', 'vcRecaptchaService', '$http', '$location',
    function($scope, $rootScope, SignupService, vcRecaptchaService, $http, $location){
        console.log("Run Signup Controller");
        $rootScope.isHide = false;
        $scope.occupation = {
            HS: false,
            SV: false,
            other: false
        };
        var isCaptchaInput = false;
        $scope.recaptcha = true;
        $scope.style = "text-danger";
        $scope.publicKey = "6LcWba8UAAAAAD27sHhCmBQ2-xf0PBtt7L1v9uFP";
        $scope.formSignUp_submit = function(){
            $scope.dataLoading = true;
            if (!isCaptchaInput){
                $scope.recaptcha = false;
                $scope.dataLoading = false;
                return;
            }
            if ($scope.password2 != "fxips.ddns.net"){
                $scope.error = "Sai Password 2 do Admin cung cấp";
                $scope.dataLoading = false;
                $scope.style = "text-danger";
                return;
            }
            SignupService.Signup(
                $scope.email, $scope.password, $scope.fullname, $scope.occupation,
                function(response){
                    if(response.success) {
                        console.log("RIGHT!");
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                        $scope.style = "text-success";
                    } else {
                        console.log("FAIL!");
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                        $scope.style = "text-danger";
                    }
                });
        };
        var widgetId_store;
        $scope.setWidgetId = function (widgetId) {
            // store the `widgetId` for future usage.
            // For example for getting the response with
            widgetId_store = widgetId;
        };

        $scope.setResponse = function (response) {
            // var res = vcRecaptchaService.getResponse(widgetId_store);
            if (response){
                isCaptchaInput = true;
            }
            console.log(response);
            console.log($location.host());
            // var data = {
            //     secret: "",
            //     response: response,
            //     remoteip: $location.host()
            // };
            // var config = {
            //     headers : {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // };
            // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            // $http.post('https://www.google.com/recaptcha/api/siteverify', data)
            // .then(
            //     function(response){ // Send success
            //         console.log("Response = " + response.data);
            //     }, 
            //     function(response){ // Send fail
            //         console.log("Fail");
            //     });
        };
    
        $scope.cbExpiration = function() {
            console.log("expire");
        };
    }]);