var sslEnabled = false;
var path  = require('path');

module.exports = {
	
	enviroment: "development",

	port : (process.env.PORT || 3000),

	model: {
		mysql : {
			database: "saproject", 
			account : "saproject", 
			password: "saproject",
			options : {
				host    : "db4free.net",  //localhost
				dialect: 'mysql',
				logging : false
			}
		}
	},

}