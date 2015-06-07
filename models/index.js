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
//export for use in other directory
// exports.Example = Example;

exports.Bulletin = Bulletin;
exports.Comment = Comment;
exports.Donation = Donation;
exports.Event = Event;
exports.User = User;