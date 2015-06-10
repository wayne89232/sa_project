'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($rootScope, $window, $scope, $http, $location) {
    $http({ method:"GET", url:'/api/check_login' }).success(function(result){
        $rootScope.isLogin = true;
    });

});
