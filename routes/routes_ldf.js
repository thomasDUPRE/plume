/**
 * Created by Thomas on 13/02/2017.
 */

// Routes Note de Frais
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');
    var LigneDeFraisCRUD = require('../crud/LigneDeFraisCRUD');
    var NoteDeFraisCRUD = require('../crud/NoteDeFraisCRUD');
    var CollaborateurCRUD  = require('../crud/CollaborateurCRUD');
    var NotificationCRUD  = require('../crud/NotificationCRUD');

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


/*** Partie Lignes de frais ***/

    app.post('/insererLDF', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (doesParamExist(req.body.id_categorie_frais) && doesParamExist(req.body.id_etat_ligne_frais) 
            && doesParamExist(req.body.id_note_frais) && doesParamExist(req.body.id_mission) 
            && doesParamExist(req.body.justificatif)) {
                
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
            if (doesParamExist(req.body.nom)) {
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
            if (doesParamExist(req.body.nom)) {
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

    // Récupérer toutes les lignes de frais en rapport avec la note de frais ID
    app.get('/getLDF', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (doesParamExist(req.query.id)) {
               
                var data = {
                    id_note_frais : req.query.id,
                    id_etat_ligne_frais : req.query.etat
                };
                
                LigneDeFraisCRUD.recupererLignesDeFrais(data, function callback(result) {
                    res.send(JSON.stringify(result))
                });

            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
         }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));

    });
    app.get('/getCollaNDF', function(req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            var data = {};
            var ndfs = [];
            var ndfsColla = [];
            //console.log(JSON.stringify(req.session.profile));

                if(req.session.profile.role.nom=="Chef de service"){
                    data.id_etat_ligne_frais = 2;
                }
                else if(req.session.profile.service.nom == "Comptabilité"){
                    data.id_etat_ligne_frais = 5;
                }
            console.log("darta: "+JSON.stringify(data));
            LigneDeFraisCRUD.recupererLignesDeFrais(data, function callback(result) {
                if(result instanceof Erreur)  res.send(JSON.stringify(result));
                else{
                    console.log("NDFS: "+JSON.stringify(result))
                    for(var i=0;i<result.length;i++){
                        if(ndfs.indexOf(result[i].id_note_frais) == -1)
                            ndfs.push(result[i].id_note_frais);
                    }
                    console.log("NDFS: "+JSON.stringify(ndfs));
                    var callbacks = ndfs.length;
                    if(callbacks == 0)  res.send(JSON.stringify([]));
                    console.log("role user:"+JSON.stringify(req.session.profile.service));
                    for(var i=0;i<ndfs.length;i++) {
                        NoteDeFraisCRUD.recupererNoteDeFrais({id: ndfs[i]}, function (ndf) {
                            if (ndf instanceof Erreur)  res.send(JSON.stringify(ndf));
                            else {
                                CollaborateurCRUD.selectCollaborateurs({id: ndf[0].id_collaborateur}, function (colla) {
                                    // peut pas modifé sa propre note de frais
                                    //colla[0].id != req.session.profile.id &&

                                    if ((req.session.profile.role.id == 10 && req.session.profile.service.id == colla[0].service.id) || req.session.profile.service.id == 2) {
                                        ndfsColla.push({
                                            nom: colla[0].nom,
                                            prenom: colla[0].prenom,
                                            id:colla[0].id,
                                            id_note_frais: ndf[0].id,
                                            date: ndf[0].date
                                        });
                                    }
                                    callbacks--;
                                    if (callbacks <= 0)  res.send(JSON.stringify(ndfsColla));

                                });
                            }
                        });
                    }

                }

            });

        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));
    });
    app.get('/validerLNDF', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            var selector = {
                id: req.query.id

            };
            var data = {};
            if (doesParamExist(req.query.id)) {
                if (req.session.profile.service.nom == "Comptabilité") {
                    data.id_etat_ligne_frais = 6;

                }
                else if (req.session.profile.role.nom == "Chef de service") {
                    data.id_etat_ligne_frais = 5;
                }


                LigneDeFraisCRUD.modifierLDF(selector, data, function callback(result) {
                    res.send(JSON.stringify(result))
                });

            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));
    });



    app.get('/invaliderLNDF', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            var selector = {
                id: req.query.id

            };
            var data = {};
            if (doesParamExist(req.query.id)) {
                if (req.session.profile.service.nom == "Comptabilité") {
                    data.id_etat_ligne_frais = 4;
                }
                else if (req.session.profile.role.nom == "Chef de service") {
                    data.id_etat_ligne_frais = 3;
                }


                LigneDeFraisCRUD.modifierLDF(selector, data, function callback(result) {
                    res.send(JSON.stringify(result))
                });

            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));
    });

    app.get('/getLDFVal', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {

            if (doesParamExist(req.query.id)) {
                var data = {
                    id_note_frais : req.query.id

                };
                if(req.session.profile.service.nom == "Comptabilité"){
                    data.id_etat_ligne_frais = 5;

                }
                else if(req.session.profile.role.nom=="Chef de service"){
                    data.id_etat_ligne_frais = 2;
                }



                LigneDeFraisCRUD.recupererLignesDeFrais(data, function callback(result) {
                    res.send(JSON.stringify(result))
                });

            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", "La requête est vide")));

    });

    app.get('/getEtatLDFVal', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {

            if (doesParamExist(req.query.id)) {

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


    // Récupérer le nom de la catégorie de la LDF à partir de son id
    app.get('/getCatLDF', function(req, res) {

        if (typeof req.query !== 'undefined' && req.query) {
            
            if (doesParamExist(req.query.id)) {
               
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
            
            if (doesParamExist(req.body.id) && doesParamExist(req.body.id_categorie_frais) && doesParamExist(req.body.id_etat_ligne_frais)
             && doesParamExist(req.body.id_note_frais) && doesParamExist(req.body.id_mission) 
             && doesParamExist(req.body.justificatif)) {
                
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
            if (doesParamExist(req.body.id) && doesParamExist(req.body.id_etat_ligne_frais)) {

                var selector = { id : req.body.id };
                var data = { id_etat_ligne_frais : req.body.id_etat_ligne_frais };
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
            if (doesParamExist(req.body.id) && doesParamExist(req.body.id_categorie_frais)) {
                var selector = { id : req.body.id };
                var data = { id_categorie_frais : req.body.id_categorie_frais };
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