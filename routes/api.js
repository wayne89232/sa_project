
// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');
var User = require('../models').User;
var Donation = require('../models').Donation;
var crypto = require('crypto');

exports.donate = function(req, res){
    var new_id = crypto.randomBytes(20).toString('hex');
    Donation.create({
        donation_id: new_id,
        user_id: req.body.user_id,
        event_id: req.body.event_id,
        date: req.body.date,
        amount: req.body.amount
    }).then(function(result){
        res.json({
            data: result.dataValues
        });
    }).error(function(err){
        console.log(err);
    })	
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
                type: user.dataValues.user_type,
                user_id: user.dataValues.user_id
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