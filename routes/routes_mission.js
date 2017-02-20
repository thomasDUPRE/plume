/**
 * Created by Thomas on 13/02/2017.
 */

// Routes Note de Frais
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var MissionCRUD = require('../crud/MissionCRUD');

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
                MissionCRUD.creerMission(data, function callback(result) {
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

    app.get('/missions', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.id) {     
                var data = {
                    id : req.query.id
                };

                MissionCRUD.recupererMesMissions(data, function callback(result) {
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
         }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));
    });

    app.get('/getMissions', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (req.query.idCollabo) {
               
                var data = {
                    id_collaborateur : req.query.idCollabo
                };

                MissionCRUD.recupererIDMissions(data, function callback(result) {
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
                
                MissionCRUD.recupererIDCollaborateurs(data, function callback(result) {
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


    
    app.post('/modifierMission', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.id && req.body.nom && req.body.description &&
                req.body.date_debut && req.body.date_fin) {
                
                var selector = {id : req.body.id };
                var data = {
                    nom : req.body.nom,
                    description : req.body.description,
                    date_debut : req.body.date_debut,
                    date_fin : req.body.date_fin
                };
                // Operation
                MissionCRUD.modifierMission(selector, data, function callback(result) {
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


    app.get('/supprimerMission', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            
            if (doesParamExist(req.query.idMission)) {
               
                var data = {
                    id : req.query.idMission
                };

                MissionCRUD.supprimerMission(data, function callback(result) {
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