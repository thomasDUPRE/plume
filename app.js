/**
 * Created by Thomas on 13/02/2017.
 */
var express = require("express");
var app     = express();
app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public'));
//Store all JS and CSS in Scripts folder.

var Erreur = require('./crud/beans/Erreur');
//var TypeErreur = require('./beans/Erreur').TypeErreur;

function doesParamExist(param){
    if(typeof param !== 'undefined' && param) return true;
    return false;
}


// -- Routing


app.get('/',function(req,res){
    // Homepage
    res.sendFile(__dirname + '/views'+'/home.html');
});

//-- JSON Routing example
app.get('/examplejson', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var erreur = new Erreur("ErreurLogin", "You have a login error");
    res.send(JSON.stringify(erreur));
});

// Autres
// DemandeInformation
app.get('/insererdemandeinfo', function(req, res) {
    // if the request exists
    if(typeof req.query !== 'undefined' &&  req.query){
        // if the parameters are ok
        if(doesParamExist(req.query.sujet) &&
            doesParamExist(req.query.contenu) &&
            doesParamExist(req.query.id_coll) &&
            doesParamExist(req.query.id_cdemande)){
            // fetch the parameters of the get request
            var data ={
                sujet: req.query.sujet,
                contenu: req.query.contenu,
                //id_collaborateur: parseInt(req.query.id_coll),
                //id_categorie_demande: parseInt(req.query.id_cdemande)
            };
            // Operation
            var DemandeInfoCRUD = require('./crud/DemandeInfoCRUD');
            DemandeInfoCRUD.creerDemande(data, function callback(result){
                console.log("Result :"+JSON.stringify(result));
                // Send result to the browser
                res.send(JSON.stringify(result));
            });
        }
        // Display error
        else res.send(JSON.stringify( new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
    }
    // Display Error
    else res.send(JSON.stringify( new Erreur("RequeteErreur", "La requête est vide")));
});



// --- Admin
// Login
// TODO : Yassine
app.get('/admin', function(req, res) {});

// Services
app.get('/services', function(req, res) {});
app.post('/insererservice', function(req, res) {});
app.post('/modifierservice', function(req, res) {});
app.post('/supservice', function(req, res) {});

// Collaborateurs
app.get('/collaborateurs', function(req, res) {});
app.post('/inserercollaborateur', function(req, res) {});
app.post('/modifercollaborateur', function(req, res) {});
app.post('/supcollaborateur', function(req, res) {});

// Collaborateurs
app.get('/collaborateurs', function(req, res) {});
app.post('/inserercollaborateur', function(req, res) {});
app.post('/modifercollaborateur', function(req, res) {});
app.post('/supcollaborateur', function(req, res) {});


app.listen(3000);

console.log("Running at Port 3000");