var _ = require('underscore');
var crypto = require('crypto');
var Event = require('../models').Event;
var Donation = require('../models').Donation;
var User = require('../models').User;

exports.show_event = function(req, res){
	User.find({ where:{ user_id: req.params.user_id } }).then(function(result){
		res.json({ data: result.dataValues });
	});
}

exports.user_info = function(req, res){
	User.find({ where:{ user_id: req.params.user_id } }).then(function(result){
		res.json({ data: result.dataValues });

	});
}
exports.donation_list = function(req, res){
	Donation.findAll({ 
		where:{ user_id: req.params.user_id },
		include: [Event] 
	}).then(function(result){
		res.json({ data: result });
	});
}