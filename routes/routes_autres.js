/**
 * Created by Thomas on 13/02/2017.
 */
// Autres routes
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var DemandeInfoCRUD = require('../crud/DemandeInfoCRUD');
    var CategorieDemande = require('../crud/CategorieDemandeCRUD');
    var RoleCRUD = require('../crud/RoleCRUD');
    var ServiceCRUD = require('../crud/ServiceCRUD');
    var CollaborateurCRUD = require('../crud/CollaborateurCRUD');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }

    function setResponse(req, res, callback){
        if(typeof req.session.profile !== 'undefined' && req.session.profile){
            callback();
        }
        else res.redirect('/');
    }


    // Collaborateurs
    app.get("/collaborateurs", function (req, res) {
        var selector = {};
        if(req.query.role) selector.id_role = parseInt(req.query.role);
        setResponse(req, res, function(){
            CollaborateurCRUD.selectCollaborateurs(selector, function(result){
                res.send(JSON.stringify({data: result}));
            });
        });
    });


    app.post('/inserercollaborateur', function(req, res) {});
    app.post('/modifercollaborateur', function(req, res) {});
    app.post('/supcollaborateur', function(req, res) {});

    // DemandeInformation (di)
    app.get('/insererdi', function (req, res) {
        // if the request exists
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.sujet) &&
                doesParamExist(req.query.contenu) &&
                doesParamExist(req.query.id_coll) &&
                doesParamExist(req.query.id_demande)) {
                // fetch the parameters of the get request
                var data = {
                    sujet: req.query.sujet,
                    contenu: req.query.contenu,
                    //id_collaborateur: parseInt(req.query.id_coll),
                    //id_categorie_demande: parseInt(req.query.id_demande)
                };
                // Operation

                DemandeInfoCRUD.insererDemande(data, function callback(result) {
                    //console.log("Result :" + JSON.stringify(result));
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
    app.get('/selectdis', function (req, res) {
        // if the request exists
        if (typeof req.query !== 'undefined' && req.query) {
            var selector = {};
            if(doesParamExist(req.query.id)) selector.id = parseInt(req.query.id);
            else if(doesParamExist(req.query.id_collaborateur)) selector.id_collaborateur = parseInt(req.query.id_collaborateur);

            var DemandeInfoCRUD = require('../crud/DemandeInfoCRUD');

            DemandeInfoCRUD.selectDemandes(selector, function callback(result) {
                console.log("Result :" + JSON.stringify(result));
                // Send result to the browser
                res.send(JSON.stringify(result));
            })

        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));

    });

    /*app.get('/selectmesdis', function (req, res) {
        // if the request exists
        if (typeof req.query !== 'undefined' && req.query) {
            // Session : recup l'id du collaboration
            //selector.id_collaborateur = parseInt(session.id);
            var selector = {};
            if(doesParamExist(req.query.id)) selector.id = parseInt(req.query.id);


            var DemandeInfoCRUD = require('../crud/DemandeInfoCRUD');

            DemandeInfoCRUD.selectDemandes(selector, function callback(result) {
                console.log("Result :" + JSON.stringify(result));
                // Send result to the browser
                res.send(JSON.stringify(result));
            })

        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));

    });*/


    app.get('/supprdi', function (req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.id)){
                var selector = {
                    id: req.query.id
                };
                DemandeInfoCRUD.supprimerDemande(selector, function callback(result){
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


    /// -- Catégorie de demandes d'informations
    // Inserer catégorie de demande d'informations
    app.get('/inserercdi', function (req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.nom)){
                var data = {
                    nom : req.query.nom
                };
                CategorieDemande.insererCategorieDemande(data, function callback(result){
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
    
    // Modifier catégorie de demande d'informations
    app.get('/modifcdi', function (req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.nom) && doesParamExist(req.query.id)){
                var selector = {
                    id: parseInt(req.query.id)
                };
                var data = {
                    nom: req.query.nom
                };
                CategorieDemande.modifCategorieDemande(selector, data, function callback(result){
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
    app.get('/selectcdis', function (req, res) {
        if (typeof req.query !== 'undefined' && req.query) {

            var selector = {};
            if (doesParamExist(req.query.id)) selector.id = parseInt(req.query.id);

                CategorieDemande.selectCategoriesDemande(selector, function callback(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });


        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });
    
    app.get('/supprcdi', function (req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.id)){
                var selector = {
                    id: req.query.id
                };
                CategorieDemande.supprimerCategorieDemande(selector, function callback(result){
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

    app.get("/selectroles", function (req, res) {
        setResponse(req, res, function(){
            RoleCRUD.selectRoles({}, function(result){
                res.send(JSON.stringify({data: result}));
            });
        });
    });
    app.get("/selectservices", function (req, res) {
        setResponse(req, res, function(){
            ServiceCRUD.selectServices({}, function(result){
                res.send(JSON.stringify({data: result}));
            });
        });
    });
}