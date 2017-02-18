/**
 * Created by Thomas on 13/02/2017.
 */

// Routes Note de Frais
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var NoteDeFraisCRUD = require('../crud/NoteDeFraisCRUD');
    var Mission = require('../crud/beans/Mission');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }



/*** Partie Missions ***/


    // Insertion d'une mission
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
                NoteDeFraisCRUD.creerMission(data, function callback(result) {
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

    app.get('/getMissions', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.idCollabo) {
               
                var data = {
                    id_collaborateur : req.query.idCollabo
                };
                
                var allmissions = [];
                NoteDeFraisCRUD.recupererIDMissions(data, function callback(result) {
                    //console.log("Missions :" + JSON.stringify(result));
                    // Send result to the browser
                   /* for (var i = 0, len = result.length; i < len; i++) {
                        var data1 = {
                            id : result[i]
                        }; 
                        var a;
                        NoteDeFraisCRUD.recupererMesMissions(data1, function callback(vals) {
                            //console.log(JSON.stringify(vals[0]));
                            //allmissions.push(new Mission(vals[0].id, vals[0].nom, vals[0].description, vals[0].date_debut, vals[0].date_fin));
                            allmissions.push(vals[0]);
                            if(i == len) {
                                console.log(JSON.stringify(vals[0]));
                                console.log(allmissions.length);                                
                            }
                        });  
                        //console.log(a);
                        //allmissions.push(a);
                    }      
                    //console.log(allmissions.length);*/
                    res.send(JSON.stringify(result));
                });
            
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
         }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));

    });


    // Les collaborateurs qui font partie de la mission idMission
    app.get('/getCollabos', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.idMission) {
               
                var data = {
                    id_mission : req.query.idMission
                };
                
                NoteDeFraisCRUD.recupererIDCollaborateurs(data, function callback(result) {
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


    
    app.post('/modifierMission', function(req, res) {});

    app.post('/supprimerMission', function(req, res) {});

/*** FIN ***/


/*** Partie Lignes de frais ***/

    app.post('/insererLDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.id_categorie_frais && req.body.id_etat_ligne_frais &&
                req.body.id_note_frais && req.body.id_mission) {
                
                var data = {
                    id_categorie_frais : req.body.id_categorie_frais,
                    id_etat_ligne_frais : req.body.id_etat_ligne_frais,
                    id_note_frais : req.body.id_note_frais,
                    id_mission : req.body.id_mission
                };
                // Operation
                NoteDeFraisCRUD.creerLDF(data, function callback(result) {
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
                
                NoteDeFraisCRUD.recupererLignesDeFrais(data, function callback(result) {
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
                
                NoteDeFraisCRUD.recupererEtatLignesDeFrais(data, function callback(result) {
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
                
                NoteDeFraisCRUD.recupererCatLignesDeFrais(data, function callback(result) {
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


    
    app.post('/modifierLDF', function(req, res) {});;
    app.post('/supprimerLDF', function(req, res) {});
    app.post('/ModifierEtatLDF', function(req, res) {});


/*** FIN ***/


/*** Partie Note de frais ***/


    app.post('/insererNDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.date_saisie && req.body.id_collaborateur) {
                
                var data = {
                    date_saisie: req.body.date_saisie,
                    id_collaborateur: parseInt(req.body.id_collaborateur)
                };
               // Operation
                NoteDeFraisCRUD.recupererNoteDeFrais(data, function callback(result) {
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


    app.get('/getNDF', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.id) {
               
                var data = {
                    id : req.query.id
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

    
    app.post('/modifierNDF', function(req, res) {});
    app.post('/supprimerNDF', function(req, res) {});


/*** FIN ***/


/*** Partie Avance Notes de frais ***/


    app.post('/insererANDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.description && req.body.somme) {
                
                var data = {
                    description: req.body.description,
                    somme: parseInt(req.body.somme)
                };
               // Operation
                NoteDeFraisCRUD.recupererAvanceNoteDeFrais(data, function callback(result) {
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
                
                NoteDeFraisCRUD.recupererAvanceNoteDeFrais(data, function callback(result) {
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
    

    app.post('/modifierANDF', function(req, res) {});
    app.post('/supprimerANDF', function(req, res) {});


/*** FIN ***/
    
    

}