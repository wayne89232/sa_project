
/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    routes = require('./routes'),
    api = require('./routes/api'),
    event = require('./routes/event'),
    user = require('./routes/user'),
    multer  = require('multer'),
    cookieParser=require('cookie-parser'),
    session = require('express-session'),
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
app.use(cookieParser('some_secret'));
app.use(session({
    secret: "some_secret",
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
    dest: "./images/",
    rename: function(fieldname, filename){
        return filename+Date.now();
    },
    onFileUploadStart: function(file){
        console.log("Uploading"+file.originalname);
    },
    onFIleUploadComplete: function(){
        console.log("Done");
    }
}));

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
app.post('/api/register', api.register);
app.post('/api/login', api.login);
app.post('/event/add_event', event.add_event);
app.post('/api/donate', api.donate);
app.get('/event/list_event', event.list_event);
app.get('/event/show_event/:event_id', event.show_event);
app.get('/event/donation_list/:event_id', event.donation_list);
app.get('/event/comment_list/:event_id', event.comment_list);
app.get('/user/donation_list/:user_id', user.donation_list);
app.get('/user/user_info/:user_id', user.user_info);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
