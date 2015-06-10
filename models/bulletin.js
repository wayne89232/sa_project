exports.Bulletin = function(Sequelize, sequelize){
	return sequelize.define('Bulletin', {
		bulletin_id: { type: Sequelize.STRING, primaryKey: true },
		event_id: Sequelize.STRING,
		title: Sequelize.STRING,
		date: Sequelize.STRING,
		content: Sequelize.STRING
	},{
		tableName: 'Bulletin'
	});
}