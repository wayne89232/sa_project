
// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');
var User = require('../models').User;

exports.checkLogin = function(req, res, next){
	if(req.session.user == undefined){
		next();
	}
	else{
		res.json({
			error:true,
			msg:"Login first"
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
			res.json({
				msg:"login success"
			});
		}
	});
}

exports.register = function(req, res){
    var query = {
        where:{
            account: req.user.account
        }
    }
    User.find(query).success(function(user){
        if(user == null){
            var user = {}
            var new_id = crypto.randomBytes(20).toString('hex');
            User.create({
            	user_id: new_id,
            	account: req.user.account,
            	password: req.user.password,
            	user_name: req.user.user_name,
            	birthdate: req.user.birthdate,
            	email: req.user.email,
            	user_type: req.user.user_type
            }).success(function(user){
                var user = _.omit(member.dataValues, 'password', 'createdAt', 'updatedAt');
                req.session.user = user;
                req.session.isLogin = true;
                res.redirect('/');
       		}).error(function(err){
            	console.log(err);
        	})
        }
        else{
            var user = _.omit(member.dataValues, 'password', 'createdAt', 'updatedAt');
            req.session.user = user;
            req.session.isLogin = true;
            res.redirect('/');
        }
    });    
}