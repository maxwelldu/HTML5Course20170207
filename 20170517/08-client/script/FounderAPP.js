var founderApp = angular.module('founderApp', [
    'ui.bootstrap.datetimepicker',
    'ngMaterial',
    'ngMessages',
    'ngRoute',
    'ngLodash',
    'ngFileUpload',
    'founderControllers',
    'ui.bootstrap',
    'someetPagination',
    'someetTextAngular',
    'angularQFileUpload',
    'founderServices',
    'uiCropper',
]);

// init submodule
angular.module('founderControllers', []);
angular.module('founderServices', []);

founderApp.config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.headers.post['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}]);

// 根据时间的字符串获得时间戳
function getTimestamp(str) {
    return (new Date(str)).getTime() / 1000;
}
// 根据时间戳获取时间的字符串
function getTimeByTimestamp(timestamp) {
    return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

founderApp.config(
    ['$routeProvider',
        function($routeProvider) {
            $routeProvider
                // 发起人查看活动列表
                .when('/founder', {
                    templateUrl: '/partial/founder/index.html',
                    controller: 'FounderListCtrl'
                })
                //发起人编辑活动
                .when('/founder/:id', {
                    templateUrl: '/partial/founder/view.html',
                    controller: 'FounderViewCtrl'
                })
                //发起人添加活动
                .when('/founder/add', {
                    templateUrl: '/partial/founder/view.html',
                    controller: 'ActivityViewCtrl'
                });

                console.log('test');
                // 默认路由
                $routeProvider.otherwise({
                    redirectTo: '/founder'
                });
        }
    ]);
