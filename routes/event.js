var _ = require('underscore');
var crypto = require('crypto');
var Event = require('../models').Event;
var User = require('../models').User;
var Donation = require('../models').Donation;

exports.add_event = function(req, res){
	var new_id = crypto.randomBytes(20).toString('hex');
	Event.create({
		event_id: new_id,
		event_name: req.body.event_name,
		photo_url: "",
		event_date: req.body.event_date,
		expire_time: req.body.expire_time,
		location: req.body.location,
		goal: req.body.event_goal,
		bank_account: req.body.bank_account,
		description: req.body.description
	}).then(function(new_event){
		res.json({ msg: "Success on adding event " + new_event });
	});
}

exports.track_event = function(req, res){
	Event_tracking.create({
		event_id: req.params.event_id,
		user_id: req.params.user_id
	}).then(function(result){
		res.json({msg: "SUccess on tracking event"});
	});
}

exports.list_event = function(req, res){
	Event.findAll().then(function(result){
		event_list = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: event_list });
	});
}

exports.donation_list = function(req, res){
	Donation.findAll({
		where:{ 
			event_id: req.params.event_id
		},
		include: [User] 
	}).then(function(result){
		donation_list = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: donation_list });
	});
}

exports.show_event = function(req, res){
	Event.find({ where:{ event_id: req.params.event_id } }).then(function(result){
		res.json({ data: result.dataValues });
	});
}
