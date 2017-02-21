/**
 * Created by Thomas on 13/02/2017.
 */
// Routes Admin
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var Service = require('../crud/ServiceCRUD');
    var Collaborateur = require('../crud/CollaborateurCRUD');

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
// --- Admin
// Login
// TODO : Yassine
    app.get('/admin', function(req, res) {});


    // Collaborateur
    app.get('/inserercollaborateur', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.mail) && doesParamExist(req.query.mot_de_passe)){

                var data = {
                    mail : req.query.mail,
                    mot_de_passe : req.query.mot_de_passe
                };

                if(doesParamExist(req.query.nom)) data.nom = req.query.nom;
                if(doesParamExist(req.query.prenom)) data.prenom = req.query.prenom;
                if(doesParamExist(req.query.telephone)) data.telephone = req.query.telephone;
                if(doesParamExist(req.query.id_service)) data.id_service = parseInt(req.query.service);
                if(doesParamExist(req.query.nb_jours_restants)) data.nb_jours_restants = parseInt(req.query.nb_jours_restants);

                Collaborateur.insererCollaborateur(data, function(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));

    });

    app.get('/selectcollaborateurs', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            var selector = {};
            if (doesParamExist(req.query.id)) selector.id = parseInt(req.query.id);
            else if (doesParamExist(req.query.id_service)) selector.chef_service = parseInt(req.query.chef_service);

            Collaborateur.selectCollaborateurs(selector, function(result){
                console.log("Result :" + JSON.stringify(result));
                // Send result to the browser
                res.send(JSON.stringify({data : result}));
            });
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });

    app.get('/modifcollaborateur', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.id)){

                var selector = {id: parseInt(req.query.id)};
                var data = {};

                if(doesParamExist(req.query.nom)) data.nom = req.query.nom;
                if(doesParamExist(req.query.prenom)) data.prenom = req.query.prenom;
                if(doesParamExist(req.query.telephone)) data.telephone = req.query.telephone;
                if(doesParamExist(req.query.id_service)) data.id_service = parseInt(req.query.service);
                if(doesParamExist(req.query.nb_jours_restants)) data.nb_jours_restants = parseInt(req.query.nb_jours_restants);

                Collaborateur.modifCollaborateur(selector, data, function(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });

    app.get('/supprcollaborateur', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.id)){
                var selector = {id:parseInt(req.query.id)};
                Collaborateur.supprimerCollaborateur(selector, function(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });



// Services
    app.get('/insererservice', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.nom)){

                var data = {nom : req.query.nom};
                if(doesParamExist(req.query.chef_service)) data.chef_service = req.query.chef_service;

                Service.insererService(data, function(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));


    });

    app.get('/selectservices', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            var selector = {};
            if (doesParamExist(req.query.chef_service)) selector.chef_service = parseInt(req.query.chef_service);
            else if (doesParamExist(req.query.id)) selector.id = parseInt(req.query.id);
            Service.selectServices(selector, function(result){
                console.log("Result :" + JSON.stringify(result));
                // Send result to the browser
                res.send(JSON.stringify({data : result}));
            });
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });

    app.get('/modifierservice', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.id) && (doesParamExist(req.query.nom) || doesParamExist(req.query.chef_service))){
                var data = {};
                var selector = {id:parseInt(req.query.id)};
                if(doesParamExist(req.query.nom)) data.nom = req.query.nom;
                if(doesParamExist(req.query.chef_service)) data.chef_service = req.query.chef_service;

                Service.modifService(selector, data, function(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });

    app.get('/supprservice', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.id)){
                var selector = {id:parseInt(req.query.id)};
                Service.supprimerService(selector, function(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });


}