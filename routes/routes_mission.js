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

    function setResponse(res, callback){
        if(typeof  req.session.profile !== 'undefined' && req.session.profile){
            callback();
        }
        else res.redirect('/');
    }

/*** Partie Missions ***/


    // Insertion d'une mission
    app.post('/insererMission', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (doesParamExist(req.body.nom) && doesParamExist(req.body.description) &&
                doesParamExist(req.body.date_debut) && doesParamExist(req.body.date_fin) 
                && doesParamExist(req.body.responsable)) {
                
                var data = {
                    nom : req.body.nom,
                    description : req.body.description,
                    date_debut : req.body.date_debut,
                    date_fin : req.body.date_fin,
                    responsable : req.body.responsable
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

    // Récupérer les détails d'une mission à partir de son identifiant
    app.get('/missions', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (doesParamExist(req.query.id)) {     
                
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


    // Récupérer les identifiants des missions d'un collaborateur à partir de l'ID du collaborateur
    app.get('/getMissions', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (doesParamExist(req.query.idCollabo)) {
               
                var data = {
                    id_collaborateur : req.query.idCollabo
                };

                MissionCRUD.recupererMissions(data, function callback(result) {
                    //console.log("Missions :" + JSON.stringify(result));
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


    // Récupérer les collaborateurs qui font partie de la mission idMission
    app.get('/getCollabos', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (doesParamExist(req.query.idMission)) {
               
                var data = {
                    id_mission : req.query.idMission
                };
                
                MissionCRUD.recupererCollaborateurs(data, function callback(result) {
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


    // Assigner une mission à un collaborateur
    app.post('/assignerMission', function(req, res) {

        if (req.body && req.body.length !== 0) {
            
            if (doesParamExist(req.body.idMission) && doesParamExist(req.body.idCollabo) &&
                doesParamExist(req.body.date_debut) && doesParamExist(req.body.date_fin)) {
               
                var data = {
                    id_collaborateur : req.body.idCollabo,
                    id_mission : req.body.idMission,
                    date_debut : req.body.date_debut,
                    date_fin : req.body.date_fin
                };
                
                MissionCRUD.assignerMissionCollaborateurs(data, function callback(result) {
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
            
            if (doesParamExist(req.body.id) && doesParamExist(req.body.nom) 
                && doesParamExist(req.body.description) && doesParamExist(req.body.date_debut) 
                && doesParamExist(req.body.date_fin) && doesParamExist(req.body.responsable)) {
                
                var selector = {id : req.body.id };
                var data = {
                    nom : req.body.nom,
                    description : req.body.description,
                    date_debut : req.body.date_debut,
                    date_fin : req.body.date_fin,
                    responsable : req.body.responsable
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