/**
 * Created by Thomas on 13/02/2017.
 */
// Autres routes
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var DemandeInfoCRUD = require('../crud/DemandeInfoCRUD');
    var CategorieDemande = require('../crud/CategorieDemandeCRUD');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }

    // Collaborateurs
    app.get('/collaborateurs', function(req, res) {});
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
                doesParamExist(req.query.id_cdemande)) {
                // fetch the parameters of the get request
                var data = {
                    sujet: req.query.sujet,
                    contenu: req.query.contenu,
                    //id_collaborateur: parseInt(req.query.id_coll),
                    //id_categorie_demande: parseInt(req.query.id_cdemande)
                };
                // Operation

                DemandeInfoCRUD.creerDemande(data, function callback(result) {
                    console.log("Result :" + JSON.stringify(result));
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

    /*app.get('/mesdi', function (req, res) {
        // if the request exists
        if (typeof req.query !== 'undefined' && req.query) {
            // Session : recup l'id du collaboration
            var data = {
                id_collaborateur: 1
            };
            var DemandeInfoCRUD = require('../crud/DemandeInfoCRUD');

            DemandeInfoCRUD.recupererMesDemandes(data, function callback(result) {
                console.log("Result :" + JSON.stringify(result));
                // Send result to the browser
                res.send(JSON.stringify(result));
            })

        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));

    });*/




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
        }
    });
    // Modifier catégorie de demande d'informations
    app.get('/modifcdi', function (req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.nom)){
                var selector = {
                    id: 4
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
        }
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
        }
    });
/*

    app.get('/selectcdi', function (req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.id)){
                var selector = {
                    id: req.query.id
                };
                CategorieDemande.selectUneCategoriesDemande(selector, function callback(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });

            }
        }
    });
    app.get('/selectcdis', function (req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.id)){
                var selector = {};
                CategorieDemande.selectLesCategoriesDemande(selector, function callback(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });

            }
        }
    });
    */
}