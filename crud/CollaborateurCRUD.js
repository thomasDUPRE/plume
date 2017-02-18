/**
 * Created by Thomas on 16/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var Collaborateur = require('./beans/Collaborateur');

class CollaborateurCRUD{
    static insererCollaborateur(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('collaborateur').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("insererCollaborateurValidation", "Le collaborateur a bien été créé");
            else
                result = new Erreur("insererCollaborateurErreur", err);
            callback(result);
            helper.close();
        });
    }

    static modifCollaborateur(selector, data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('collaborateur').update(selector, data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("modifCollaborateurValidation", "Le collaborateur a bien été modifié");
            else
                result = new Erreur("modifCollaborateurErreur", err);
            callback(result);
            helper.close();
        });
    }

    static selectCollaborateurs(selector, callback){
        var helper = new CRUDHelper();

        helper.getTable('collaborateur').load(selector, function (err, vals) {
            //mysql callback

            if (!err){
                var result = [];
                for(var i = 0, len = vals.length; i < len; i++){
                    result.push(new Collaborateur(vals[i].id, vals[i].nom, vals[i].prenom, vals[i].service, null, null, vals[i].telephone, vals[i].mail, vals[i].nb_jours_restants));
                }
                callback(result);
            }
            else
                callback(new Erreur("selectCollaborateursErreur", err));
            helper.close();

        });
    }

    static supprimerCollaborateur(selector, callback) {
        var helper = new CRUDHelper();
        helper.getTable('collaborateur').destroy(selector, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("supprimerCollaborateurValidation", "Le collaborateur a bien été supprimé");
            else
                result = new Erreur("supprimerCollaborateurErreur", err);
            callback(result);
            helper.close();
        });
    }
}

module.exports = CollaborateurCRUD;