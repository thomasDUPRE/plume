/**
 * Created by Thomas on 13/02/2017.
 */

// Routes Note de Frais
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }



    // Insertion d'une ligne de frais
    app.post('/insererMission', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.nom && req.body.description &&
                req.body.date_debut && req.body.date_fin) {
                
                var data = {
                    nom : req.body.nom,
                    description : req.body.description,
                    date_debut : req.body.date_debut,
                    date_fin : req.body.date_fin
                };
                // Operation
                var NoteDeFraisCRUD = require('../crud/NoteDeFraisCRUD');
                NoteDeFraisCRUD.creerMission(data, function callback(result) {
                    console.log("Missions :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("MissionErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("MissionErreur", "La requête est vide")));
    
    });

    app.post('/insererLDF', function(req, res) {});

    app.post('/insererNDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.date_saisie && req.body.id_collaborateur) {
                
                var data = {
                    date_saisie: req.body.date_saisie,
                    id_collaborateur: parseInt(req.body.id_collaborateur)
                };
               // Operation
                var NoteDeFraisCRUD = require('../crud/NoteDeFraisCRUD');
                NoteDeFraisCRUD.recupererNoteDeFrais(data, function callback(result) {
                    console.log("NDF :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("NDFErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("NDFErreur", "La requête est vide")));
     
    });

    app.post('/insererANDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.description && req.body.somme) {
                
                var data = {
                    description: req.body.description,
                    somme: parseInt(req.body.somme)
                };
               // Operation
                var NoteDeFraisCRUD = require('../crud/NoteDeFraisCRUD');
                NoteDeFraisCRUD.recupererAvanceNoteDeFrais(data, function callback(result) {
                    console.log("ANDF :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ANDFErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("ANDFErreur", "La requête est vide")));
     
    });

    
    
    app.post('/modifierMission', function(req, res) {});
    
    app.post('/modifierLDF', function(req, res) {});
    
    app.post('/modifierNDF', function(req, res) {});
    
    app.post('/modifierANDF', function(req, res) {});
    
    
    
    app.post('/supprimerMission', function(req, res) {});
    
    app.post('/supprimerLDF', function(req, res) {});
    
    app.post('/supprimerNDF', function(req, res) {});
    
    app.post('/supprimerANDF', function(req, res) {});
    


    app.post('/validerLDF', function(req, res) {});

    app.post('/validerNDF', function(req, res) {});
    
    app.post('/validerANDF', function(req, res) {});
    


    app.get('/getMission', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.id_collaborateur) {
               
                var data = {
                    'id_collaborateur' : req.query.id_collaborateur
                };
                var NoteDeFraisCRUD = require('../crud/NoteDeFraisCRUD');

                NoteDeFraisCRUD.recupererMesIDMissions(data, function callback(result) {
                    console.log("Missions :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                })

            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ANDFErreur", "Les paramètres ne sont pas corrects")));
         }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));

    });

    app.get('/getLDF', function(req, res) {});

    app.get('/getNDF', function(req, res) {});

    app.get('/getANDF', function(req, res) {});

}