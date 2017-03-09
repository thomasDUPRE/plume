/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var Mission = require('./beans/Mission');
var MissionCollabo = require('./beans/MissionCollaborateur');

class MissionCRUD {

/*** Partie Missions ***/

    // Récuperation des id des missions d'un collaborateur
    static recupererMissions(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('missions_collaborateurs').load(data, function (err, vals) {
            //mysql callback
            var result = [];

            if (!err) {
                for (var i = 0, len = vals.length; i < len; i++) {
                    result.push(new MissionCollabo(vals[i].id_collaborateur, vals[i].id_mission, vals[i].date_debut_mission, vals[i].date_fin_mission));
                }
            }
            else
                result = new Erreur("RecupMissionsIDErreur", err);
            callback(result);
        });
    }

    // Récuperation des id des collaborateurs d'une mission
    static recupererCollaborateurs(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('missions_collaborateurs').load(data, function (err, vals) {
            //mysql callback
            var result = [];

            if (!err) {
                for (var i = 0, len = vals.length; i < len; i++) {
                    result.push(new MissionCollabo(vals[i].id_collaborateur, vals[i].id_mission, vals[i].date_debut_mission, vals[i].date_fin_mission));
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
            var result = [];
            if (!err) {
                //result = vals;
                for (var i = 0, len = vals.length; i < len; i++) {
                    result.push(new Mission(vals[i].id, vals[i].nom, vals[i].description, vals[i].date_debut, vals[i].date_fin, vals[i].responsable));
                }
            }    
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

    static assignerMissionCollaborateurs(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('missions_collaborateurs').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("AssignerMissionValidation", "La mission a bien été assignée");
            else
                result = new Erreur("AssignerMissionErreur", err);
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