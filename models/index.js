var settimns = require("../setting/db");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		settimns.model.mysql.database,
		settimns.model.mysql.account,
		settimns.model.mysql.password,
		settimns.model.mysql.options
	);

// import models: 
// var Example = require('./example').Example(Sequelize,sequelize);
var Bulletin = require('./bulletin').Bulletin(Sequelize,sequelize);
var Comment = require('./comment').Comment(Sequelize,sequelize);
var Donation = require('./donation').Donation(Sequelize,sequelize);
var Event = require('./event').Event(Sequelize,sequelize);
var Follow = require('./follow').Follow(Sequelize,sequelize);
var Friend = require('./friend').Friend(Sequelize,sequelize)
var User = require('./user').User(Sequelize,sequelize);

//add some relations here
// Example.hasMany(People, {foreignKey: 'people_id'});
Event.hasMany(Bulletin, {foreignKey: 'bulletin_id'});
Bulletin.belongsTo(Event, {foreignKey: 'bulletin_id'});
Event.hasMany(Comment, {foreignKey: 'comment_id'});
Comment.belongsTo(Event, {foreignKey: 'comment_id'});
User.hasMany(Comment, {foreignKey: 'comment_id'});
Comment.belongsTo(User, {foreignKey: 'comment_id'});
Event.hasMany(Donation, {foreignKey: 'donation_id'});
Donation.belongsTo(Event, {foreignKey: 'donation_id'});
User.hasMany(Donation, {foreignKey: 'donation_id'});
Donation.belongsTo(User, {foreignKey: 'donation_id'});
Event.hasMany(Follow, {foreignKey: 'follow_id'});
Follow.belongsTo(Event, {foreignKey: 'follow_id'});
User.hasMany(Follow, {foreignKey: 'follow_id'});
Follow.belongsTo(User, {foreignKey: 'follow_id'});
User.hasMany(Friend, {foreignKey: 'user_id'});
Friend.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Friend, {foreignKey: 'friend_id'});
Friend.belongsTo(User, {foreignKey: 'friend_id'});
//export for use in other directory
// exports.Example = Example;

exports.Bulletin = Bulletin;
exports.Comment = Comment;
exports.Donation = Donation;
exports.Event = Event;
exports.Follow = Follow;
exports.Friend = Friend;
exports.User = User;