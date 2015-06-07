exports.Event = function(Sequelize, sequelize){
	return sequelize.define('Event', {
		event_id: { type: Sequelize.INTEGER, primaryKey: true }, 
		event_name: Sequelize.STRING ,
		photo_url: Sequelize.STRING,
		event_date: Sequelize.STRING,
		expire_time: Sequelize.STRING,
		location: Sequelize.STRING,
		goal: Sequelize.INTEGER,
		bank_account: Sequelize.STRING,
		description: Sequelize.STRING
	},{
		tableName: 'Event'
	});
}