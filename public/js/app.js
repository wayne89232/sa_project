'use strict';

angular.module('myApp', [
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/home',
        controller: 'AppCtrl'
    }).
    when('/Event', {
        templateUrl: 'partials/event',
        controller: 'AppCtrl'
    }).otherwise({
        redirectTo: '/home'
    });

  
});
