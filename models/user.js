exports.User = function(Sequelize, sequelize){
	return sequelize.define('User', {
		user_id: { type: Sequelize.STRING, primaryKey: true },
		account: Sequelize.STRING,
		password: Sequelize.STRING,
		photo_url: Sequelize.STRING,
		user_name: Sequelize.STRING,
		birthdate: Sequelize.STRING,
		email: Sequelize.STRING, 
		user_type: {
			type:   Sequelize.ENUM,
			values: ['admin', 'donor']
		}
	},{
		tableName: 'user'
	});
}