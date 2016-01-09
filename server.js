'use strict';

var express = require('express');
var routes = require('./route.js');
var session = require('express-session');
var locale = require("locale")
var useragent = require('express-useragent');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();

//This line accounts for the C9.io dev environment's usage of the process.env.PORT variable to run apps.
//when not running on c9, it will default to port 3000
//
app.set('port', 3000);
app.use(useragent.express());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

routes( useragent, locale,app, url, bodyParser );

var port = process.env.PORT || 3000 ;

app.listen(port,  function () {
    console.log('Node.js listening on port ' + port + '...');

});

