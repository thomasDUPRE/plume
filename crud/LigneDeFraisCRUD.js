/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var LigneDeFrais= require('./beans/LigneDeFrais');
var MissionCRUD = require('./MissionCRUD');
class LigneDeFraisCRUD {


/*** Partie Lignes de frais ***/

    // Recuperation informations des lignes de frais d'une note de frais
    static recupererLignesDeFrais(data, callback){
        var helper = new CRUDHelper();
        var result = [];
        helper.getTable('ligne_frais').load(data, function (err1, vals) {
            //mysql callback
            if(err1) { result = new Erreur("RecupLigneDeFrais", vals);  callback(result);}
            else {
                var LDFcompteur = vals.length;

                LigneDeFraisCRUD.recupererEtatLignesDeFrais({}, function(etats) {
                        LigneDeFraisCRUD.recupererCatLignesDeFrais({}, function (cats) {
                            console.log("Size : "+vals.length);

                            for (var i = 0; i<vals.length; i++) {
                                var etat = etats.filter(function (el) {
                                    return (el.id == vals[i].id_etat_ligne_frais);
                                });
                                var cat = cats.filter(function (el) {
                                    return (el.id == vals[i].id_categorie_frais);
                                });
                                 var id= vals[i].id;
                                var id_ndf = vals[i].id_note_frais;
                                var id_justi =vals[i].justificatif;
                                var id_miss = vals[i].id_mission;
                                    MissionCRUD.recupererMesMissions({id: id_miss}, function (missions) {
                                        //console.log("mission: "+JSON.stringify(missions));
                                    result.push(new LigneDeFrais(id, cat, etat, id_ndf, missions[0], id_justi));
                                    LDFcompteur--;
                                    if (LDFcompteur <= 0) callback(result);
                                });
                            }
                        });
                });
            }
        });
    }

    // Recuperation du nom de l'état d'une ligne de frais à partir de son ID
    static recupererEtatLignesDeFrais(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('etat_ligne_frais').load(data, function (err, vals) {
            //mysql callback

            var result;
            if (!err)
                result = vals;
            else
                result = new Erreur("RecupEtatLigneDeFrais", err);
            callback(result);
        });
    }

    // Recuperation du nom de la catégorie de la ligne de frais à partir de son ID
    static recupererCatLignesDeFrais(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('categorie_frais').load(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = vals;
            else
                result = new Erreur("RecupCatLigneDeFrais", err);
            callback(result);
        });
    }


    static creerLDF(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('ligne_frais').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("CreerLigneDeFraisValidation", "La ligne de frais a bien été créée");
            else
                result = new Erreur("CreerLigneDeFraisErreur", err);
            callback(result);
        });
    }

    static creerCatLDF(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('categorie_frais').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("CreerCatLigneDeFraisValidation", "La catégorie de ligne de frais a bien été créée");
            else
                result = new Erreur("CreerCatLigneDeFraisErreur", err);
            callback(result);
        });
    }

    static creerEtatLDF(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('etat_ligne_frais').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("CreerEtatLigneDeFraisValidation", "L'état de ligne de frais a bien été créée");
            else
                result = new Erreur("CreerEtatLigneDeFraisErreur", err);
            callback(result);
        });
    }

    static modifierLDF(selector, values, callback) {
        var helper = new CRUDHelper();
        helper.getTable('ligne_frais').update(selector, values, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("ModifierLigneDeFraisValidation", "La ligne de frais a bien été modifiée");
            else
                result = new Erreur("ModifierLigneDeFraisErreur", err);
            callback(result);
        });
    }

    static modifierCatLDF(selector, values, callback) {
        var helper = new CRUDHelper();
        helper.getTable('ligne_frais').update(selector, values, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("ModifierCatLigneDeFraisValidation", "La catégorie ligne de frais a bien été modifiée");
            else
                result = new Erreur("ModifierCatLigneDeFraisErreur", err);
            callback(result);
        });
    }

    static modifierEtatLDF(selector, values, callback) {
        var helper = new CRUDHelper();
        helper.getTable('ligne_frais').update(selector, values, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("ModifierEtatLigneDeFraisValidation", "L'état de ligne de frais a bien été modifiée");
            else
                result = new Erreur("ModifierEtatLigneDeFraisErreur", err);
            callback(result);
        });
    }

    static supprimerLDF(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('ligne_frais').destroy(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("SupprimerLigneDeFraisValidation", "La ligne de frais a bien été supprimée");
            else
                result = new Erreur("SupprimerLigneDeFraisErreur", err);
            callback(result);
        });
    }


/*** FIN ***/

}
module.exports = LigneDeFraisCRUD;