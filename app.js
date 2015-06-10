
/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    routes = require('./routes'),
    api = require('./routes/api'),
    multer  = require('multer'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
