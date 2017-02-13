/**
 * Created by Thomas on 13/02/2017.
 */
var express = require("express");
var app     = express();
app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public'));
//Store all JS and CSS in Scripts folder.

var Erreur = require('./beans/Erreur');
//var TypeErreur = require('./beans/Erreur').TypeErreur;
var MissionCRUD = require('./sqlhandlers/MissionCRUD');


app.get('/',function(req,res){
    var erreur = new Erreur("ErreurLogin", "You have a login error");
    console.log("hey");
    MissionCRUD.fetchMission();


    //console.log(erreur);
    //res.sendFile('home.html');

});

app.listen(3000);

console.log("Running at Port 3000");