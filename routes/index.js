var paypal = require('paypal-rest-sdk');
var config = {};
/*
 * GET home page.
 */

exports.index = function(req, res){
  	res.render('index');
};

exports.partials = function (req, res) {
	// console.log(req.params.name);
  	var name = req.params.name;
  	res.render('partials/' + name);
};

exports.init = function(c){
  config = c;
  paypal.configure(c.api);
};