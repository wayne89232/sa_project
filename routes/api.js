
// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');
var User = require('../models').User;
var crypto = require('crypto');

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
	User.find(query).then(function(user){
		if(user == null){
			res.json({
                success:false,
                msg: "no such user"
            });
		}
        else if(req.body.password!=user.dataValues.password){
            res.json({
                success: false,
                msg: "wrong password"
            })
        }
		else{
			res.json({
				success: true,
                user: user.dataValues.account,
                type: user.dataValues.user_type
			});
		}
	});
}

exports.register = function(req, res){
    var query = {
        where:{
            account: req.body.account
        }
    }
    var new_id = crypto.randomBytes(20).toString('hex');
    User.find(query).then(function(user){
        if(user == null){
            var user = {}
            var new_id = crypto.randomBytes(20).toString('hex');
            User.create({
            	user_id: new_id,
            	account: req.body.account,
            	password: req.body.password,
            	user_name: req.body.user_name,
            	birthdate: req.body.birthdate,
            	email: req.body.email,
            	user_type: "donor"
            }).then(function(user){
                var user = _.omit(user.dataValues, 'password', 'createdAt', 'updatedAt');
                console.log(user);
                req.session.user = user;
                req.session.isLogin = true;
                res.redirect('/');
       		}).error(function(err){
            	console.log(err);
        	})
        }
        else{
            res.redirect('/');
        }
    });    
}