exports.Comment = function(Sequelize, sequelize){
  return sequelize.define('Comment', {
    comment_id: { type: Sequelize.STRING, primaryKey: true}, 
    user_id: Sequelize.STRING,
    event_id: Sequelize.STRING,
    content: Sequelize.STRING
  },{
    tableName: 'Comment'
  });
}