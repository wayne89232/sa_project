exports.Event = function(Sequelize, sequelize){
	return sequelize.define('Event', {
		event_id: { type: Sequelize.STRING, primaryKey: true }, 
		event_name: Sequelize.STRING ,
		event_holder: Sequelize.STRING,
		photo_url: Sequelize.STRING,
		event_date: Sequelize.STRING,
		expire_time: Sequelize.STRING,
		location: Sequelize.STRING,
		goal: Sequelize.INTEGER,
		bank_account: Sequelize.STRING,
		description: Sequelize.TEXT
	},{
		tableName: 'event'
	});
}