var _ = require('underscore');
var crypto = require('crypto');
var Event = require('../models').Event;
var User = require('../models').User;

exports.show_event = function(req, res){
	User.find({ where:{ user_id: req.params.user_id } }).then(function(result){
		res.json({ msg: result.dataValues });
	});
}