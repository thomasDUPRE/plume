/**
 * Created by Thomas on 13/02/2017.
 */

// Routes Note de Frais
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var LigneDeFraisCRUD = require('../crud/LigneDeFraisCRUD');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }


/*** Partie Lignes de frais ***/

    app.post('/insererLDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.id_categorie_frais && req.body.id_etat_ligne_frais &&
                req.body.id_note_frais && req.body.id_mission && req.body.justificatif) {
                
                var data = {
                    id_categorie_frais : req.body.id_categorie_frais,
                    id_etat_ligne_frais : req.body.id_etat_ligne_frais,
                    id_note_frais : req.body.id_note_frais,
                    id_mission : req.body.id_mission,
                    justificatif : req.body.justificatif
                };
                // Operation
                LigneDeFraisCRUD.creerLDF(data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("LDFErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("LDFErreur", "La requête est vide")));
    
    });

    app.post('/insererCatLDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            if (req.body.nom) {
                var data = {
                    nom : req.body.nom
                };
                // Operation
                LigneDeFraisCRUD.insererCatLDF(data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("LDFErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("LDFErreur", "La requête est vide")));
    
    });

    app.post('/insererEtatLDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            if (req.body.nom) {
                var data = {
                    nom : req.body.nom
                };
                // Operation
                LigneDeFraisCRUD.insererEtatLDF(data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("LDFErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("LDFErreur", "La requête est vide")));
    });

    app.get('/getLDF', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.id) {
               
                var data = {
                    id : req.query.id
                };
                
                LigneDeFraisCRUD.recupererLignesDeFrais(data, function callback(result) {
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


        app.get('/getEtatLDF', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.id) {
               
                var data = {
                    id : req.query.id
                };
                
                LigneDeFraisCRUD.recupererEtatLignesDeFrais(data, function callback(result) {
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


    app.get('/getCatLDF', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.id) {
               
                var data = {
                    id : req.query.id
                };
                
                LigneDeFraisCRUD.recupererCatLignesDeFrais(data, function callback(result) {
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


    
    app.post('/modifierLDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.id && req.body.id_categorie_frais && req.body.id_etat_ligne_frais &&
                req.body.id_note_frais && req.body.id_mission && req.body.justificatif) {
                
                var selector = { id : req.body.id };
                var data = {
                    id_categorie_frais : req.body.id_categorie_frais,
                    id_etat_ligne_frais : req.body.id_etat_ligne_frais,
                    id_note_frais : req.body.id_note_frais,
                    id_mission : req.body.id_mission,
                    justificatif : req.body.justificatif
                };
                // Operation
                LigneDeFraisCRUD.modifierLDF(selector, data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("LDFErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("LDFErreur", "La requête est vide")));
    
    });


    app.post('/ModifierEtatLDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            if (req.body.id && req.body.nom) {
                var selector = { id : req.body.id };
                var data = { nom : req.body.nom };
                // Operation
                LigneDeFraisCRUD.modifierEtatLDF(selector, data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("LDFErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("LDFErreur", "La requête est vide")));
    });


    app.post('/ModifierCatLDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            if (req.body.id && req.body.nom) {
                var selector = { id : req.body.id };
                var data = { nom : req.body.nom };
                // Operation
                LigneDeFraisCRUD.modifierCatLDF(selector, data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("LDFErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("LDFErreur", "La requête est vide")));
    });


    app.get('/supprimerLDF', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            
            if (doesParamExist(req.query.id)) {
               
                var data = {
                    id : req.query.id
                };

                LigneDeFraisCRUD.supprimerLDF(data, function callback(result) {
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