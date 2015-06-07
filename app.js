
/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    routes = require('./routes'),
    api = require('./routes/api'),
    cookieParser=require('cookie-parser'),
    session = require('express-session'),
    // import routers
    // example = require('./routes/example'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();


/**
 * Configuration

 */
var fs = require('fs');
 
try {
  var configJSON = fs.readFileSync(__dirname + "/config.json");
  var config = JSON.parse(configJSON.toString());
} catch (e) {
  console.error("File config.json not found or is invalid: " + e.message);
  process.exit(1);
}
routes.init(config); //paypal

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('your secret here'));
app.use(session({
    secret: "some secret",
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));


var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  // app.use(express.errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//functions, ex: 
// app.post('/api/add_league', api.add_league);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
