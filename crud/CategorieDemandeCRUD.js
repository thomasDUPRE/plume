/**
 * Created by Thomas on 16/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var CategorieDemande = require('./beans/CategorieDemande');

class CategorieDemandeCRUD{
    static insererCategorieDemande(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('categorie_demande').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("insererCategorieDemandeValidation", "La catégorie de demande a bien été créée");
            else
                result = new Erreur("insererCategorieDemandeErreur", err);
            callback(result);
            helper.close();
        });
    }

    static selectCategoriesDemande(selector, callback) {
        var helper = new CRUDHelper();
        helper.getTable('categorie_demande').load(selector, function (err, vals) {
            //mysql callback

            if (!err) {
                var result = [];
                for (var i = 0, len = vals.length; i < len; i++) {
                    result.push(new CategorieDemande(vals[i].id, vals[i].nom));
                }
                callback(result);
            }
            else
                callback(new Erreur("insererCategorieDemandeErreur", err));
            helper.close();
        });
    }
    static modifCategorieDemande(selector, data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('categorie_demande').update(selector, data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("modifCategorieDemandeValidation", "La catégorie de demande a bien été modifiée");
            else
                result = new Erreur("modifCategorieDemandeErreur", err);
            callback(result);
            helper.close();
        });
    }

    static supprimerCategorieDemande(selector, callback) {
        var helper = new CRUDHelper();
        helper.getTable('categorie_demande').destroy(selector, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("creerCategorieDemandeValidation", "La catégorie de demande a bien été supprimée");
            else
                result = new Erreur("creerCategorieDemandeErreur", err);
            callback(result);
            helper.close();
        });
    }
}

module.exports = CategorieDemandeCRUD;