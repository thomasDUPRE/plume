/**
 * Created by Thomas on 25/02/2017.
 */
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var NotificationCRUD = require('../crud/NotificationCRUD');
    var CollaborateurCRUD = require('../crud/CollaborateurCRUD');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }

    function setResponse(res, callback) {
        if (typeof  req.session.profile !== 'undefined' && req.session.profile) {
            callback();
        }
        else res.redirect('/');
    }

    app.get('/inserernotification', function(req, res) {
        var error = false;
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.type) && doesParamExist(req.query.id) && doesParamExist(req.query.sujet) && doesParamExist(req.query.contenu)) {
                if(req.query.type == 'service'){
                    // Envoyer notification à tous les collaborateurs du service
                    var selectorService = {
                        id_service : req.query.id
                    };
                    var data = {
                        sujet: req.query.sujet,
                        contenu: req.query.contenu,
                        vu: 0
                    }
                    CollaborateurCRUD.selectCollaborateurs(selectorService, function(result){
                        if(result instanceof Erreur) { error = true; res.send(JSON.stringify(result));}
                        else{
                            result.forEach(function(collaborateur){
                                data.id_collaborateur = collaborateur.id;
                                NotificationCRUD.insererNotification(data, function(result2){
                                    if(result2 instanceof Erreur) { error = true; res.send(JSON.stringify(result));}
                                });
                            });
                        }
                    });
                }
                else if(req.query.type == 'collaborateur'){
                    // Envoyer notification à un collaborateur

                }
                else res.send(JSON.stringify(new Erreur("ParamErreur","La valeur du paramètre type n'est pas correct")));
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });

};