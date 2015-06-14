'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($rootScope, $window, $scope, $http, $location) {
    
	if($window.localStorage.getItem("is_login")){
		$scope.is_login = true;
		$scope.local_user = $window.localStorage.getItem("account");
	} 	

	$scope.login = function(){
		if($scope.account != null && $scope.password != null){
	            var data = {
	                account: $scope.account, 
	                password: $scope.password
	            };
		    $http({ 
		    	method:"POST", 
		    	url:'/api/login',
		    	data: data
		     }).then(function(result){
				if(result.data.success==true){
					$window.localStorage.setItem("is_login", true);
					$window.localStorage.setItem("account", result.data.user);
					$window.location.reload();
				}
				else{
					alert(result.data.msg)
					$window.location.reload();
				}
		    });	
		}
		else{
			alert("Invalid account or password");
		}
	}
	$scope.logout = function(){
		$window.localStorage.clear();
		$window.location.reload();
	}
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
