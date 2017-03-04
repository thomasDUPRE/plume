/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var AvanceNoteFrais= require('./beans/AvanceNoteFrais');

class AvanceNoteDeFraisCRUD {


/*** Partie Avance Notes de frais ***/

    // Recuperation informations d'une avance de note de frais
    static recupererAvanceNoteDeFrais(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('avance_note_frais').load(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = new AvanceNoteFrais(vals[0].id, vals[0].description , vals[0].somme);
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
module.exports = AvanceNoteDeFraisCRUD;