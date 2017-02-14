/**
 * Created by Thomas on 13/02/2017.
 */
var express = require("express");
var app     = express();
app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public'));
//Store all JS and CSS in Scripts folder.

// -- Routing
require('./routes/routes_main')(app);
require('./routes/routes_admin')(app);
require('./routes/routes_conge')(app);
require('./routes/routes_ndf')(app);
require('./routes/routes_autres')(app);

app.listen(3000);

console.log("Running at Port 3000");