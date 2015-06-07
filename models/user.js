exports.User = function(Sequelize, sequelize){
  return sequelize.define('User', {
    player_id: { type: Sequelize.INTEGER, primaryKey: true }, 
    photo_url: Sequelize.STRING ,
    user_name: Sequelize.STRING,
    birthdate: Sequelize.STRING,
    email: Sequelize.STRING, 
    user_type: {
    	type:   Sequelize.ENUM,
    	values: ['admin', 'donor']
    }
  },{
    tableName: 'User'
  });
}