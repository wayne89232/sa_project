'use strict';

angular.module('myApp.controllers', ['ngRoute','angular-datepicker']).controller('AppCtrl', function ($rootScope, $window, $scope, $http, $location) {
    
	if($window.localStorage.getItem("is_login")){
		$scope.is_login = true;
		$scope.local_user = $window.localStorage.getItem("account");
		$scope.user_type = $window.localStorage.getItem("user_type");
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
					$window.localStorage.setItem("user_type", result.data.type);
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
	$scope.donor_identify = function(){
		if($scope.user_type=="donor"){
			return true;
		}
		else{
			return false;
		}
	}
	$scope.admin_identify = function(){
		if($scope.user_type=="admin"){
			return true;
		}
		else{
			return false;
		}
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
}).controller('User', function ($scope, $http, $location, $window, $routeParams) {
    $scope.current = 0;
	$scope.show = [false, true, true, true, true];
	$scope.show_change = function(num){
		if(num != $scope.current){
			$scope.show[$scope.current] = true;
			$scope.show[num] = false;
			$scope.current = num;
		}
	}
}).controller('Event', function ($scope, $http, $location, $window, $routeParams) {
	$scope.event_list = []; 
    $http({
        method: "GET", 
        url: '/event/list_event', 
    }).then(function(result){
    	console.log(result.data.data);
    	$scope.event_list = result.data.data;
    });
    $scope.show_event = function(id){
    	$location.path('/event/'+id);
    }	
}).controller('show_event', function ($scope, $http, $location, $window, $routeParams) {
	$http({ method:"GET", url:'/event/show_event/' + $routeParams.id }).success(function(result){
        $scope.event = result.data;
        console.log($scope.event);
    });
}).controller('Create_event', function ($scope, $http, $location, $window, $routeParams) {
    $scope.add_event = function(){
    	if($scope.event_name != null && $scope.event_date != null && $scope.goal != null){
            var data = {
                event_name: $scope.event_name, 
                event_date: $scope.event_date,
                event_goal: $scope.goal,
                location:$scope.location,
                description: $scope.description
            };
            $http({
                method: "POST", 
                url: '/event/add_event', 
                data: data
            }).then(function(result){
            	$window.location.reload();
            	$location.path("/Event");
            });
        }
        else{
        	console.log($scope.event_name +$scope.event_date+$scope.goal)
            alert("Fill in all entities!");
        }
    }
});
