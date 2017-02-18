/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var Mission = require('./beans/Mission');

class NoteDeFraisCRUD {

/*** Partie Missions ***/

    // Récuperation des id des missions d'un collaborateur
    static recupererIDMissions(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('missions_collaborateurs').load(data, function (err, vals) {
            //mysql callback
            var result = [];

            if (!err) {
                for (var i = 0, len = vals.length; i < len; i++) {
                    result.push(vals[i].id_mission);
                }
            }
            else
                result = new Erreur("RecupMissionsIDErreur", err);
            callback(result);
        });
    }

    // Récuperation des id des collaborateurs d'une mission
    static recupererIDCollaborateurs(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('missions_collaborateurs').load(data, function (err, vals) {
            //mysql callback
            var result = [];

            if (!err) {
                for (var i = 0, len = vals.length; i < len; i++) {
                    result.push(vals[i].id_collaborateur);
                }
            }
            else
                result = new Erreur("RecupCollaboIDErreur", err);
            callback(result);
        });
    }

    // Recuperation informations d'une mission à partir de l'ID
    static recupererMesMissions(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('mission').load(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = vals;
                //result = new Mission(vals.id, vals.nom, vals.description, vals.date_debut, vals.date_fin);
            else
                result = new Erreur("RecupMissionsErreur", err);
            callback(result);
        });
    }
   
    // Recuperation informations d'un collaborateur
    static recupererInfosCollaborateurs(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('collaborateur').load(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = vals;
            else
                result = new Erreur("RecupCollaborateurErreur", err);
            callback(result);
        });
    }


    static creerMission(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('mission').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("CreerMissionValidation", "La mission a bien été créée");
            else
                result = new Erreur("CreerMissionErreur", err);
            callback(result);
        });
    }


    static modifierMission(selector, values, callback) {
        var helper = new CRUDHelper();
        helper.getTable('mission').update(selector, values, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("ModifierMissionValidation", "La mission a bien été modifiée");
            else
                result = new Erreur("ModifierMissionErreur", err);
            callback(result);
        });
    }

    static supprimerMission(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('mission').destroy(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("SupprimerMissionValidation", "La mission a bien été supprimée");
            else
                result = new Erreur("SupprimerMissionErreur", err);
            callback(result);
        });
    }

/*** FIN ***/


/*** Partie Lignes de frais ***/

    // Recuperation informations des lignes de frais d'une note de frais
    static recupererLignesDeFrais(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('ligne_frais').load(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = vals;
            else
                result = new Erreur("RecupLigneDeFrais", err);
            callback(result);
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


/*** Partie Note de frais ***/


    // Recuperation informations des notes de frais d'un collaborateur
    static recupererNoteDeFrais(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('note_frais').load(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = vals;
            else
                result = new Erreur("RecupNoteDeFrais", err);
            callback(result);
        });
    }

    static creerNDF(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('note_frais').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("CreerNoteDeFraisValidation", "La note de frais a bien été créée");
            else
                result = new Erreur("CreerNoteDeFraisErreur", err);
            callback(result);
        });
    }

    static modifierNDF(selector, values, callback) {
        var helper = new CRUDHelper();
        helper.getTable('note_frais').update(selector, values, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("ModifierNoteDeFraisValidation", "La note de frais a bien été modifiée");
            else
                result = new Erreur("ModifierNoteDeFraisErreur", err);
            callback(result);
        });
    }


    static supprimerNDF(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('note_frais').destroy(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("SupprimerNoteDeFraisValidation", "La note de frais a bien été supprimée");
            else
                result = new Erreur("SupprimerNoteDeFraisErreur", err);
            callback(result);
        });
    }

/*** FIN ***/


/*** Partie Avance Notes de frais ***/

    // Recuperation informations d'une avance de note de frais
    static recupererAvanceNoteDeFrais(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('avance_note_frais').load(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = vals;
            else
                result = new Erreur("RecupAvanceNoteDeFrais", err);
            callback(result);
        });
    }
 
    static creerANDF(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('avance_note_frais').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("CreerAvanceNoteDeFraisValidation", "L'avance de note de frais a bien été créée");
            else
                result = new Erreur("CreerAvanceNoteDeFraisErreur", err);
            callback(result);
        });
    }

    static modifierANDF(selector, values, callback) {
        var helper = new CRUDHelper();
        helper.getTable('avance_note_frais').update(selector, values, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("ModifierAvanceNoteDeFraisValidation", "L'avance de note de frais a bien été modifiée");
            else
                result = new Erreur("ModifierAvanceNoteDeFraisErreur", err);
            callback(result);
        });
    }

    static supprimerANDF(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('avance_note_frais').destroy(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("SupprimerAvanceNoteDeFraisValidation", "L'avance de note de frais a bien été supprimée");
            else
                result = new Erreur("SupprimerAvanceNoteDeFraisErreur", err);
            callback(result);
        });
    }            

/*** FIN ***/

}
module.exports = NoteDeFraisCRUD;