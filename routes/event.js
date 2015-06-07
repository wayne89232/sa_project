var _ = require('underscore');
var crypto = require('crypto');
var Event = require('../models').Event;

exports.add_event = function(req, res){
	var new_id = crypto.randomBytes(20).toString('hex');
	Event.create({
		event_id: new_id,
		event_name: req.body.name,
		photo_url: "",
		event_date: req.body.event_date,
		expire_time: req.body.expire_time,
		location: req.body.location,
		goal: req.body.goal,
		bank_account: req.body.bank_account,
		description: req.body.description
	}).then(function(new_event){
		res.json({ msg: "Success on adding event " + new_event });
	});

}