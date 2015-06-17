'use strict';

angular.module('myApp.controllers', ['ngRoute','angular-datepicker']).controller('AppCtrl', function ($rootScope, $window, $scope, $http, $location) {
    
	if($window.localStorage.getItem("is_login")){
		$scope.is_login = true;
		$scope.local_user = $window.localStorage.getItem("account");
		$scope.user_type = $window.localStorage.getItem("user_type");
	} 	
    $http({
        method: "GET", 
        url: '/event/list_event', 
    }).then(function(result){
    	$scope.home_event_list = result.data.data;
    	if($scope.home_event_list.length>3){
    		$scope.home_event_list = $scope.home_event_list.slice(0,3)
    	}
    });
    $scope.show_event = function(id){
    	$location.path('/event/'+id);
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
					$window.localStorage.setItem("user_id", result.data.user_id);
					$window.location.reload();
				}
				else{
					alert(result.data.msg);
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
        $location.path('/');
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
    $scope.user_info = function(){
    	$location.path('/user/'+$window.localStorage.getItem("user_id"));
    }	
}).controller('Create_account', function ($scope, $http, $location, $window, $routeParams) {
    $scope.register = function(){
    	if($scope.account != null && $scope.password != null){
			if($scope.password==$scope.password_confirm){
	            var data = {
	                account: $scope.account, 
	                password: $scope.password,
	                user_name: $scope.user_name,
	                birthdate: $scope.birthdate,
	                email: $scope.email,
	                type: "donor"
	            };
	            $http({
	                method: "POST", 
	                url: '/api/register', 
	                data: data
	            }).then(function(result){
	            	if(result.data.success==false){
	            		alert(result.data.msg);
	            	}
	            	else{
						$window.localStorage.setItem("is_login", true);
						$window.localStorage.setItem("account", result.data.user);
						$window.localStorage.setItem("user_type", result.data.type);
						$window.localStorage.setItem("user_id", result.data.user_id);
						$window.location.reload();       		
	                	$location.path('/');	            		
	            	}
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
	$http({ method:"GET", url:'/user/user_info/' + $routeParams.id }).then(function(user_info){
        $http({ method:"GET", url:'/user/donation_list/' + $routeParams.id }).then(function(result){
        	$http({ method:"GET", url:'/user/track_list/' + $routeParams.id }).then(function(tracks){
				$scope.event_list = tracks.data.data;
				$scope.user_info = user_info.data.data;
				$scope.donation_list = result.data.data;
			});	
    	});
    });
    if($routeParams.id==$window.localStorage.getItem("user_id")){
    	$scope.is_user=false;
    }
    else{
    	$scope.is_user=true;
    }
    $scope.current = 0;
	$scope.show = [false, true, true, true, true];
	$scope.show_change = function(num){
		if(num != $scope.current){
			$scope.show[$scope.current] = true;
			$scope.show[num] = false;
			$scope.current = num;
		}
	}
    $scope.show_event = function(id){
    	$location.path('/event/'+id);
    }	
}).controller('Donate', function ($scope, $http, $location, $window, $routeParams) {
    $scope.donate = function(){
    	var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1;
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		var newdate = year + "/" + month + "/" + day;
        var data = {
        	user_id: $window.localStorage.getItem("user_id"),
        	event_id:  $routeParams.event_id,
            amount: $scope.amount,
            comment: $scope.comment,
            date: newdate
        };
        if($scope.amount == parseInt($scope.amount, 10) && !isNaN(parseInt($scope.amount, 10))){
	 	    $http({
		        method: "POST", 
		        url: '/api/donate',
		        data: data
		    }).then(function(result){
		    	$location.path('/event/'+result.data.data.event_id);
		    });   	       	
        }
        else{
        	alert("enter valid amount");
        }

    }
}).controller('Event', function ($scope, $http, $location, $window, $routeParams) {
	$scope.event_list = []; 
    $http({
        method: "GET", 
        url: '/event/list_event', 
    }).then(function(result){
    	$scope.event_list = result.data.data;
    });
    $scope.show_event = function(id){
    	$location.path('/event/'+id);
    }	
}).controller('show_event', function ($scope, $http, $location, $window, $routeParams) {
	$http({ method:"GET", url:'/event/show_event/' + $routeParams.id }).then(function(events){
        $http({ method:"GET", url:'/event/donation_list/' + $routeParams.id }).then(function(result){
    		$http({ method:"GET", url:'/event/comment_list/' + $routeParams.id }).then(function(comments){
	    		$scope.event = events.data.data;
	    		$scope.donation_list = result.data.data;
	    		$scope.donation_count = $scope.donation_list.length;
	    		$scope.donation_total = 0;
	    		_.map($scope.donation_list, function(result){
					$scope.donation_total+=result.amount;
				});
				$scope.progress = Math.round($scope.donation_total/$scope.event.goal * 100);
				if(isNaN($scope.progress)){
					$scope.progress = 0;
				}
	        	if($scope.event.goal==null){
	        		$scope.event.goal=0;
	        		$scope.progress=100;
	        	}
				if($scope.progress > 100){
					$scope.progress_bar = {"width": "100%"};
				}
				else{
					$scope.progress_bar = {"width": $scope.progress+"%"}
				}
				$scope.comments = comments.data.data;
    		});
    	});
    });

	$scope.current = 0;
	$scope.show = [false, true, true];
	$scope.show_change = function(num){
		if(num != $scope.current){
			$scope.show[$scope.current] = true;
			$scope.show[num] = false;
			$scope.current = num;
		}
	}
	$scope.go_donate = function(){
		if($window.localStorage.getItem("is_login")){
			$location.path('/Donate/'+$routeParams.id);
		}
		else{
			alert("Please login");
		}    	
    }	
}).controller('Create_event', function ($scope, $http, $location, $window, $routeParams) {
    $scope.add_event = function(){
    	if($scope.goal != parseInt($scope.goal, 10) || isNaN(parseInt($scope.goal, 10))){
    		alert("enter valid amount in your goal");
    	}
    	else if($scope.event_name != null && $scope.event_date != null && $scope.goal != null){
            var data = {
                event_name: $scope.event_name, 
                event_date: $scope.event_date,
                event_goal: parseInt($scope.goal),
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
            alert("Fill in all entities!");
        }
    }
});
