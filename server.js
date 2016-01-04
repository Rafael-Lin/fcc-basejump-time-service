'use strict';

var express = require('express');
var routes = require('./route.js');
var session = require('express-session');
var app = express();

//This line accounts for the C9.io dev environment's usage of the process.env.PORT variable to run apps.
//when not running on c9, it will default to port 3000
//
app.set('port', process.env.PORT || 3000);

app.use('/public', express.static(process.cwd() + '/public'));
app.use(session({
    secret: 'secretClementine',
    resave: false,
    saveUninitialized: true
}));

routes(app);

var port = 3000 ;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');

});

