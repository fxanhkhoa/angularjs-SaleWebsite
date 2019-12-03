'use strict';

var app = angular.module("IPSApp", 
    ['ngRoute','ngCookies',
    'Authentication', 'Signup', 'dashboard', 'add_product', 'product_info', 'modify_product',
    'ngMaterial', 'ngMessages', 'toaster', 'ngAnimate']);

app.config(function($routeProvider, $mdThemingProvider, $mdDateLocaleProvider,
    $mdAriaProvider
    ) {
    // Globally disables all ARIA warnings.
    $mdAriaProvider.disableWarnings();
    
    $mdThemingProvider.definePalette('colormaterial', {
        '50': 'f3e0e0',
        '100': 'e0b3b3',
        '200': 'cc8080',
        '300': 'b84d4d',
        '400': 'a82626',
        '500': '990000',
        '600': '910000',
        '700': '860000',
        '800': '7c0000',
        '900': '6b0000',
        'A100': 'ff9a9a',
        'A200': 'ff6767',
        'A400': 'ff3434',
        'A700': 'ff1a1a',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
            '50',
            '100',
            '200',
            'A100',
            'A200'
        ],
        'contrastLightColors': [
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
            'A400',
            'A700'
        ]
      });

    // $mdThemingProvider.theme('default')
    //     .primaryPalette('colormaterial')
    //     .warnPalette('red')
    //     .accentPalette('green')
    //     .dark();

    $mdThemingProvider.theme('docs-dark')
        .primaryPalette('colormaterial',{
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '400', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100', // use shade A100 for the <code>md-hue-3</code> class
        })
        .warnPalette('red')
        .accentPalette('blue')
        .dark();
    $routeProvider
    .when("/",{
        redirectTo: '/dashboard'
    })
    .when("/dashboard",{
        controller : "DashboardController",
        templateUrl : "modules/dashboard/views/dashboard.html",
    })
    .when("/login", {
        controller: 'LoginController',
        templateUrl : "modules/login/views/login.html"
    })
    .when("/signup", {
        controller: 'SignupController',
        templateUrl : "modules/signup/views/signup.html"
    })
    .when("/add_product",{
        controller: "AddProductController",
        templateUrl: "modules/add_product/views/add_product.html"
    })
    .when("/product_info/:page",{
        controller: "ProductInfoController",
        templateUrl: "modules/product_info/views/product_info.html"
    })
    .when("/modify_product/:barcode",{
        controller: "ModifyProductController",
        templateUrl: "modules/modify_product/views/modify_product.html"
    })
    .otherwise({
        template : "<div class=\"container section-gap\"><h1>None</h1><p>NOT FOUND</p></div>"
    });

    // $mdDateLocaleProvider.formatDate = function(date) {
    //     return moment(date).format('DD-MM-YYYY');
    // };
});

app.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        console.log("Now Run");
        $rootScope.isHide = false;
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        var listAcceptPath = ["/login", "/signup"];

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if (!listAcceptPath.includes($location.path()) && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
}]);

app.controller('IPSController', function($scope, $location, $rootScope, $log){
    $scope.weburi = $location.absUrl();
    $scope.myhostname = $location.host();
    $scope.webportno = $location.port();
    $scope.webprotocol = $location.protocol();

    this.account = [
        {
            action: 'Tài khoản của tôi',
            list_action: [
                {
                    name: 'Sửa thông tin'
                },
                {
                    name: 'Đổi mật khẩu'
                }
            ]
        },
        {
            action: 'Chức năng',
            list_action: [
                {
                    name: 'Gửi tin nhắn'
                },
                {
                    name: 'Đăng xuất'
                }
            ]
        },
      ];

    $rootScope.goto = function(page){
        $location.path('/' + page);
    }

    this.onClick = function onClick(item) {
        // $log.log(item);
        if (item == "Sửa thông tin"){

        }
        else if (item == "Đổi mật khẩu"){

        }
        else if (item == "Gửi tin nhắn"){

        }
        else if (item == "Đăng xuất"){
            $location.path('/login');
        }
    };
});