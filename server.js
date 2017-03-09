var express = require("express");
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var app     = express();

app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public'));
//Store all JS and CSS in Scripts folder.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressSession({secret:'plumeisthebest'}));

// -- Routing
require('./routes/routes_main')(app);
require('./routes/routes_admin')(app);
require('./routes/routes_conge')(app);
require('./routes/routes_mission')(app);
require('./routes/routes_ldf')(app);
require('./routes/routes_ndf')(app);
require('./routes/routes_andf')(app);
require('./routes/routes_notification')(app);
require('./routes/routes_autres')(app);



app.listen(3000, function (err) {

});

console.log("App Started on PORT 3000");



