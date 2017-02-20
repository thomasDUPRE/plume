/**
 * Created by Thomas on 13/02/2017.
 */

// Routes Note de Frais
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var AvanceNoteDeFraisCRUD = require('../crud/AvanceNoteDeFraisCRUD');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }
    

/*** Partie Avance Notes de frais ***/


    app.post('/insererANDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.description && req.body.somme) {
                
                var data = {
                    description: req.body.description,
                    somme: req.body.somme
                };
               // Operation
                AvanceNoteDeFraisCRUD.creerAvanceNoteDeFrais(data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("ANDFErreur", "La requête est vide")));
     
    });
        
    app.get('/getANDF', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.id) {
               
                var data = {
                    id : req.query.id
                };
                
                AvanceNoteDeFraisCRUD.recupererAvanceNoteDeFrais(data, function callback(result) {
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
    

    app.post('/modifierANDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.id && req.body.description && req.body.somme) {
                
                var selector = { id : req.body.id };
                var data = {
                    description: req.body.description,
                    somme: req.body.somme
                };
               // Operation
                AvanceNoteDeFraisCRUD.modifierAvanceNoteDeFrais(selector, data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("ANDFErreur", "La requête est vide")));
     
    });


    app.post('/supprimerANDF', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            
            if (doesParamExist(req.query.id)) {
               
                var data = {
                    id : req.query.id
                };

                AvanceNoteDeFraisCRUD.supprimerANDF(data, function callback(result) {
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