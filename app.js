/**
* Module dependencies.
*/
var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');

//var methodOverride = require('method-override');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Parking'
});

connection.connect();

global.db = connection;

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.listen(8000)

app.get('/', routes.index);//call for main index page
app.get('/login', routes.index);
app.get('/signup', user.signup);
app.post('/login', user.login);
app.post('/signup', user.signup);
app.get('/home/dashboard', user.dashboard);