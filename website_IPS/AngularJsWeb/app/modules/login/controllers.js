'use strict';

angular.module('Authentication', [])

.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        console.log("Run Login Controller");
        $rootScope.isHide = false;
        // reset login status
        AuthenticationService.ClearCredentials();
        var isCaptchaInput = false;
        $scope.recaptcha = true;
        $scope.style = "text-danger";
        
        $scope.formSignIn_submit = function(){
            console.log("Clicked Submit");
            if (!isCaptchaInput){
                $scope.recaptcha = false;
                $scope.dataLoading = false;
                return;
            }
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.email, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.email, $scope.password);
                    console.log("RIGHT!");
                    $location.path('/dashboard');
                } else {
                    console.log("FAIL!");
                    $scope.error = response.message;
                    $scope.dataLoading = false;
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