/**
 * Created by Thomas on 13/02/2017.
 */
var express = require("express");
var app     = express();
app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res){
    res.sendFile('index.html');
    //It will find and locate index.html from View or Scripts
});

app.listen(3000);

console.log("Running at Port 3000");