var settings = require("./setting/db.js");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		settings.model.mysql.database,
		settings.model.mysql.account,
		settings.model.mysql.password,
		settings.model.mysql.options
	);

// import models for syncing
// var Example = require('./models').Example;

var Bulletin = require('./models').Bulletin;
var Comment = require('./models').Comment;
var Donation = require('./models').Donation;
var Event = require('./models').Event;
var Follow = require('./models').Follow;
var Friendship = require('./models').Friendship;
var User = require('./models').User;



// Sync database with below
// Example.sync({force: true});

Bulletin.sync({force: true});
Comment.sync({force: true});
Donation.sync({force: true});
Event.sync({force: true});
Follow.sync({force: true});
Friendship.sync({force: true});
User.sync({force: true});