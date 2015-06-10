exports.Friendship = function(Sequelize, sequelize){
	return sequelize.define('Friendship', {
		friendship_id: { type: Sequelize.INTEGER, primaryKey: true },
		user_id: Sequelize.INTEGER,
		friend_id: Sequelize.INTEGER
	},{
		tableName: 'Friendship'
	});
}