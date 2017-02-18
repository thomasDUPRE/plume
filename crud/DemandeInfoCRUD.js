/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var DemandeInformation = require('./beans/DemandeInformation');

class DemandeInfoCRUD {
    static insererDemande(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('demande_information').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("CreerDemandeValidation", "La demande d'information a bien été créée");
            else
                result = new Erreur("CreerDemandeErreur", err);
            callback(result);
            helper.close();
        });

    }

    static selectDemandes(selector, callback){
        var helper = new CRUDHelper();

        helper.getTable('demande_information').load(selector, function (err, vals) {
            //mysql callback

            if (!err){
                var result = [];
                for(var i = 0, len = vals.length; i < len; i++){
                    result.push(new DemandeInformation(vals[i].id, vals[i].id_collaborateur, vals[i].id_categorie_demande, vals[i].sujet, vals[i].contenu));
                }
                callback(result);
            }
            else
                callback(new Erreur("selectDemandeErreur", err))
            helper.close();

        });
    }

    static modifierDemande(selector, data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('demande_information').update(selector, data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("modifierDemandeValidation", "La demande d'information a bien été modifiée");
            else
                result = new Erreur("modifierDemandeErreur", err);
            callback(result);
            helper.close();
        });
    }

    static supprimerDemande(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('demande_information').destroy(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("supprimerDemandeValidation", "La demande d'information a bien été supprimée");
            else
                result = new Erreur("supprimerDemandeErreur", err);
            callback(result);
            helper.close();
        });
    }

}
module.exports = DemandeInfoCRUD;