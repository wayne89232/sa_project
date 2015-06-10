var settings = require("../setting/db");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		settings.model.mysql.database,
		settings.model.mysql.account,
		settings.model.mysql.password,
		settings.model.mysql.options
	);

// import models: 
// var Example = require('./example').Example(Sequelize,sequelize);
var Bulletin = require('./bulletin').Bulletin(Sequelize,sequelize);
var Comment = require('./comment').Comment(Sequelize,sequelize);
var Donation = require('./donation').Donation(Sequelize,sequelize);
var Event = require('./event').Event(Sequelize,sequelize);
var Follow = require('./follow').Follow(Sequelize,sequelize);
var Friendship = require('./friendship').Friendship(Sequelize,sequelize)
var User = require('./user').User(Sequelize,sequelize);

//add some relations here
// Example.hasMany(People, {foreignKey: 'people_id'});
Event.hasMany(Bulletin, {foreignKey: 'event_id'});
Bulletin.belongsTo(Event, {foreignKey: 'event_id'});
Event.hasMany(Comment, {foreignKey: 'event_id'});
Comment.belongsTo(Event, {foreignKey: 'event_id'});
User.hasMany(Comment, {foreignKey: 'user_id'});
Comment.belongsTo(User, {foreignKey: 'user_id'});
Event.hasMany(Donation, {foreignKey: 'event_id'});
Donation.belongsTo(Event, {foreignKey: 'event_id'});
User.hasMany(Donation, {foreignKey: 'user_id'});
Donation.belongsTo(User, {foreignKey: 'user_id'});
Event.hasMany(Follow, {foreignKey: 'event_id'});
Follow.belongsTo(Event, {foreignKey: 'event_id'});
User.hasMany(Follow, {foreignKey: 'user_id'});
Follow.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Friendship, {foreignKey: 'user_id'});
Friendship.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Friendship, {foreignKey: 'friend_id'});
Friendship.belongsTo(User, {foreignKey: 'user_id'});
//export for use in other directory
// exports.Example = Example;

exports.Bulletin = Bulletin;
exports.Comment = Comment;
exports.Donation = Donation;
exports.Event = Event;
exports.Follow = Follow;
exports.Friendship = Friendship;
exports.User = User;