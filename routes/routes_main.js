var express = require("express");
// Routes principales
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur')
    var Validation = require('../crud/beans/Validation');
    var CollaborateurCRUD = require('../crud/CollaborateurCRUD');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }

    console.log(__dirname);
    // Homepage
    app.get('/', function (req, res) {

        var path = require("path"),
            fs = require("fs");

        // If user is connected
        if (typeof  req.session.profile !== 'undefined' && req.session.profile){
            console.log("Profile: "+JSON.stringify(req.session.profile));
            res.sendFile(path.join(__dirname, '..', 'views/home.html'));
        }
        else {
            res.sendFile(path.join(__dirname, '..', 'views/login.html'));
        }
    });

   app.get('/login',function (req, res) {
       res.redirect('/');
    });

    app.get('/logout',function (req, res) {
        delete req.session.profile;
        res.redirect('/');
    });



    app.post('/login', function (req, res) {
            // Homepage
            if (typeof req.query !== 'undefined' && req.query) {
                // if the parameters are ok
                if (doesParamExist(req.body.mail) && doesParamExist(req.body.mot_de_passe)) {
                    // check with the table
                    var selector = {
                      mail : req.body.mail
                    };
                    CollaborateurCRUD.selectMDPCollaborateur(selector, function(result){

                        if(result instanceof Erreur){
                            res.send(JSON.stringify(result));
                        }
                        else if(result.mot_de_passe == req.body.mot_de_passe){
                            req.session.profile = result.getCollaborateur();
                            console.log("Password ok");
                            var path = require("path"),
                                fs = require("fs");
                            res.send(JSON.stringify(new Validation("BonMotDePasse", "Connexion réalisée")));
                        }
                        else {
                            console.log("Password not ok");
                            res.send(JSON.stringify(new Erreur("MauvaisMotDePasse", "Le mot de passe rentré est faux")));
                        }



                    });

                }
                // Display error
                else res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
            }
            // Display Error
            else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });

    app.get('/name', function (req, res) {
        var path = require("path"),
            fs = require("fs");

        if (typeof  req.session.profile !== 'undefined' && req.session.profile){
            res.send(JSON.stringify(req.session.profile));
        }
        else {
            res.sendFile(path.join(__dirname, '..', 'views/login.html'));
        }
    });
}