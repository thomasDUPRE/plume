/**
 * Created by Thomas on 13/02/2017.
 */

// Routes Note de Frais
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var NoteDeFraisCRUD = require('../crud/NoteDeFraisCRUD');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }

    function setResponse(res, callback){
        if(typeof  req.session.profile !== 'undefined' && req.session.profile){
            callback();
        }
        else res.redirect('/');
    }
/*** Partie Note de frais ***/


    app.post('/insererNDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.date_saisie && req.body.id_collaborateur) {
                
                var data = {
                    date_saisie: req.body.date_saisie,
                    id_collaborateur: req.body.id_collaborateur
                };
               // Operation
                NoteDeFraisCRUD.creerNoteDeFrais(data, function callback(result) {
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

    // Récupérer les notes de frais d'un collaborateur avec son ID
    app.get('/getNDF', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.id) {
               
                var data = {
                    id_collaborateur : req.query.id
                };
                
                NoteDeFraisCRUD.recupererNoteDeFrais(data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });

            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
         }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));

    });

    
    app.post('/modifierNDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            if (req.body.id && req.body.date_saisie && req.body.id_collaborateur) {
                
                var selector = { id : req.body.id };
                var data = {
                    date_saisie: req.body.date_saisie,
                    id_collaborateur: req.body.id_collaborateur
                };
               // Operation
                NoteDeFraisCRUD.modifierNoteDeFrais(selector, data, function callback(result) {
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

    
    app.post('/supprimerNDF', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            
            if (doesParamExist(req.query.id)) {
               
                var data = {
                    id : req.query.id
                };

                NoteDeFraisCRUD.supprimerNDF(data, function callback(result) {
                    res.send(JSON.stringify(result));
                });
            
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
         }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));

    });


/*** FIN ***/
    

}