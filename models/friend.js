exports.Friend = function(Sequelize, sequelize){
	return sequelize.define('Friend', {
		id: { type: Sequelize.INTEGER, primaryKey: true },
		user_id: Sequelize.INTEGER,
		friend_id: Sequelize.INTEGER
	},{
		tableName: 'Friend'
	});
}