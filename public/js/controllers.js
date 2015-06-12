'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($rootScope, $window, $scope, $http, $location) {
    // $http({ method:"GET", url:'/api/check_login' }).success(function(result){
    //     $rootScope.isLogin = true;
    // });
	
}).controller('Create_account', function ($scope, $http, $location, $window, $routeParams) {
    $scope.register = function(){
    	if($scope.account != null && $scope.password != null){
			if($scope.password==$scope.password_confirm){
	            var data = {
	                account: $scope.account, 
	                password: $scope.password,
	                user_name: "",
	                birthdate:"",
	                email: $scope.email,
	                type: "donor"
	            };
	            $http({
	                method: "POST", 
	                url: '/api/register', 
	                data: data
	            }).then(function(result){
	                $window.location.reload();
	                $location.path('/');
	            });
        	}
        	else{
        		alert("Password != Confirm password");
        	}
        }
        else{
            alert("Fill in all entities!");
        }
    }
});
