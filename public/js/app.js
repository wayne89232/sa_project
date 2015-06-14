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
        controller: 'Event'
    }).
    when('/Signup', {
        templateUrl: 'partials/account',
        controller: 'Create_account'
    }).
    when('/event/:id', {
      templateUrl: 'partials/showevent',
      controller: 'show_event'
    }).
    when('/Donate', {
        templateUrl: 'partials/donate'

    }).
    when('/User', {
        templateUrl: 'partials/user',
        controller: 'User'
    }).
    when('/Create_event', {
        templateUrl: 'partials/createevent',
        controller: 'Create_event'
    }).
    otherwise({
        redirectTo: '/home'
    });

  
});
