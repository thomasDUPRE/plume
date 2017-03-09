/**
 * Created by Thomas on 25/02/2017.
 */
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var Validation = require('../crud/beans/Validation' +
        '');
    var NotificationCRUD = require('../crud/NotificationCRUD');
    var CollaborateurCRUD = require('../crud/CollaborateurCRUD');
    var ServiceCRUD = require('../crud/ServiceCRUD');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }

    function setResponse(req, res, callback) {
        if (typeof  req.session.profile !== 'undefined' && req.session.profile) {
            callback();
        }
        else res.redirect('/');
    }

    app.post('/inserernotification', function(req, res) {
        setResponse(req, res, function(){
            var error = false;
            if (typeof req.body !== 'undefined' && req.body) {
                // if the parameters are ok
                if (doesParamExist(req.body.type) && doesParamExist(req.body.id) && doesParamExist(req.body.sujet) && doesParamExist(req.body.contenu)) {
                    var date_notification =  new Date().toISOString().slice(0, 19).replace('T', ' ');
                    console.log("date notification: "+date_notification);
                    var data = {
                        sujet: req.body.sujet,
                        contenu: req.body.contenu,
                        date_notification : date_notification,
                        vu: 0
                    }
                    if(req.body.type == 'service'){
                        // Envoyer notification à tous les collaborateurs du service
                        var selectorService = {
                            id_service : req.body.id
                        };
                        CollaborateurCRUD.selectCollaborateurs(selectorService, function(result){
                            if(result instanceof Erreur) { error = true; res.send(JSON.stringify(result));}
                            else{
                                var callbacks = result.length;
                                result.forEach(function(collaborateur){
                                    NotificationCRUD.insererNotification({sujet: req.body.sujet, contenu: req.body.contenu, vu: 0, id_collaborateur: collaborateur.id}
                                    , function(result2){
                                        callbacks--;
                                        if(!error && callbacks<=0){
                                            res.send(JSON.stringify(result2));
                                        }
                                    });
                                });
                            }
                        });
                    }
                    if(req.body.type == 'chef_service') {
                        // Envoyer notification à tous les collaborateurs du service
                        var selectorService = {
                            id: req.body.id
                        };
                        ServiceCRUD.selectServices(selectorService, function(result){
                            if(result instanceof Erreur) { error = true; res.send(JSON.stringify(result));}
                            else {
                                data.id_collaborateur =  result[0].chef_service;
                                NotificationCRUD.insererNotification(data, function(result2){
                                    res.send(JSON.stringify(result2));
                                });
                            }
                        });
                    }
                    else if(req.body.type == 'collaborateur'){
                        // Envoyer notification à un collaborateur
                        data.id_collaborateur = req.body.id;
                        NotificationCRUD.insererNotification(data, function(result2){
                            res.send(JSON.stringify(result2));
                        });
                    }

                    else res.send(JSON.stringify(new Erreur("ParamErreur","La valeur du paramètre type n'est pas correct")));
                }
                // Display error
                else res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
            }
            // Display Error
            else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
        });


    });

    app.get('/selectnotifications', function(req, res){
        setResponse(req, res, function(){
            var selector = {
                id_collaborateur: req.session.profile.id
            };
            if (doesParamExist(req.query.vu)) selector.vu = parseInt(req.query.vu);
            NotificationCRUD.selectNotifications(selector, function(notifications){
               if(notifications instanceof Erreur)  res.send(JSON.stringify(notifications));
               else res.send(JSON.stringify({data : notifications}));
           });
        });
    });


    app.get('/vunotifications', function(req, res){
        setResponse(req, res, function(){
            var selector = {
                vu: 0,
                id_collaborateur: req.session.profile.id
            };
            var data = {
                vu: 1
            };
            NotificationCRUD.modifNotification(selector, data, function(result){
                if(result instanceof Erreur)  res.send(JSON.stringify(result));
                else res.send(JSON.stringify(result));
            });
        });
    });


};