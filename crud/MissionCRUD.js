/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var Mission = require('./beans/Mission');

class MissionCRUD {

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
                //result = vals;
                result = new Mission(vals[0].id, vals[0].nom, vals[0].description, vals[0].date_debut, vals[0].date_fin);
            else
                result = new Erreur("RecupMissionsErreur", err);
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


}
module.exports = MissionCRUD;