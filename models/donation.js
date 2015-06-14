exports.Donation = function(Sequelize, sequelize){
	return sequelize.define('Donation', {
		donation_id: { type: Sequelize.STRING, primaryKey: true}, 
		user_id: Sequelize.STRING,
		event_id: Sequelize.STRING,
		date: Sequelize.STRING,
		amount: Sequelize.INTEGER
	},{
		tableName: 'donation'
	});
}