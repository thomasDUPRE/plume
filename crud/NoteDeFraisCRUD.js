/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var NoteDeFrais= require('./beans/NoteDeFrais');

class NoteDeFraisCRUD {

/*** Partie Note de frais ***/


    // Recuperation informations des notes de frais d'un collaborateur
    static recupererNoteDeFrais(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('note_frais').load(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = new NoteDeFrais(vals[0].id, vals[0].date_saisie , vals[0].id_collaborateur);
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

}
module.exports = NoteDeFraisCRUD;