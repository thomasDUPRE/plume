/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');

class DemandeInfoCRUD {
    static creerDemande(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('demande_information').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("CreerDemandeValidation", "La demande d'information a bien été créée");
            else
                result = new Erreur("CreerDemandeErreur", err);
            callback(result);
        });
    }
    static recupererMesDemandes(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('demande_information').select(data, function (err, vals) {
            //mysql callback
            var result;
            if (!err)
                result = vals;
            else
                result = new Erreur("RecupMesDemandesErreur", err);
            callback(result);
        });
    }


}
module.exports = DemandeInfoCRUD;