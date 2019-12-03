'use strict';

angular.module('dashboard', ['ngMaterial', 'ngCookies'])

.controller('DashboardController',
    ['$scope', '$rootScope', '$location', '$mdSidenav', '$cookieStore',
    function ($scope, $rootScope, $location, $mdSidenav, $mdThemingProvider, $cookieStore) {
        console.log("Run Dashboard Controller");
        $rootScope.isHide = true;
        $scope.toggleLeft = buildToggler('left');
        $scope.cb1 = false;

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
            console.log(cbState);
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
    }]);