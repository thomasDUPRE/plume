/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');

class NoteDeFraisCRUD {

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
    
    //Checker les update et les delete

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


    // Récuperation des id des missions d'un collaborateur
    static recupererMesIDMissions(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('missions_collaborateur').load(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = vals;
            else
                result = new Erreur("RecupMissionsIDErreur", err);
            callback(result);
        });
    }

    // Recuperation informations d'une mission
    static recupererMesMissions(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('mission').load(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = vals;
            else
                result = new Erreur("RecupMissionsErreur", err);
            callback(result);
        });
    }

    // Recuperation informations d'une ligne de frais
    static recupererLigneDeFrais(data, callback){
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

    // Recuperation informations d'une note de frais
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

}
module.exports = NoteDeFraisCRUD;