exports.Follow = function(Sequelize, sequelize){
	return sequelize.define('Follow', {
		follow_id: { type: Sequelize.STRING, primaryKey: true}, 
		user_id: Sequelize.STRING,
		event_id: Sequelize.STRING,
	},{
		tableName: 'Follow'
	});
}