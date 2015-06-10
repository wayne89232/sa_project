var _ = require('underscore');
var crypto = require('crypto');
var Event = require('../models').Event;
var Comment = require('../models').Comment;


exports.add_comment = function(req, res){
	var new_id = crypto.randomBytes(20).toString('hex');
	Event.find({ where: { event_id: req.body.event_id } }).then(function(result){
		if(_.size(result) != 0){
			Comment.create({
				comment_id: new_id,
				user_id: req.body.user_id,
				event_id: req.body.event_id,
				content: req.body.content
			}).then(function(comment){
				res.json({ msg: "Success on adding comment to " +  comment.comment_id});
			});
		}
		else{
			res.json({ msg: "Event doesn't exist. " });
		}
	});

}