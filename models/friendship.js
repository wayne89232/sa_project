exports.Friendship = function(Sequelize, sequelize){
	return sequelize.define('Friendship', {
		friendship_id: { type: Sequelize.STRING, primaryKey: true },
		user_id: Sequelize.STRING,
		friend_id: Sequelize.STRING
	},{
		tableName: 'Friendship'
	});
}