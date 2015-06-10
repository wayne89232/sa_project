
// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');


exports.checkLogin = function(req, res, next){
	var isLogin = false;
	if( _.has(req.session, 'isLogin') ){
		isLogin = req.session.isLogin;
	}
	if(isLogin){
		next();
	}else{
		res.status(401).json({
			error:true,
			msg:"Plz login"
		});
	}
}

exports.login = function (req, res){
	var query = {
		where:{
			account: req.body.account
		}
	}
	User.find(query).success(function(user){
		if(user == null){
			res.json({msg:"No user!"});
		}
		else{
			var user = _.omit(user.dataValues, 'password', 'createdAt', 'updatedAt');
			req.session.user = user;
			req.session.isLogin = true;
			res.json({msg:"login success"});
		}
	});
}
