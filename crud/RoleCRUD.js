/**
 * Created by Thomas on 21/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var Role = require('./beans/Role');

class RoleCRUD {
    static insererRole(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('role').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("insererRoleValidation", "Le role a bien été créé");
            else
                result = new Erreur("insererRoleErreur", err);
            callback(result);
            helper.close();
        });
    }

    static modifRole(selector, data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('role').update(selector, data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("modifRoleValidation", "Le role a bien été modifié");
            else
                result = new Erreur("modifRoleErreur", JSON.stringify(err));
            callback(result);
            helper.close();
        });
    }

    static selectRoles(selector, callback){
        var helper = new CRUDHelper();

        helper.getTable('role').load(selector, function (err, vals) {
            //mysql callback

            if (!err){
                var result = [];
                for(var i = 0, len = vals.length; i < len; i++){
                    result.push(new Role(vals[i].id, vals[i].nom));
                }
                callback(result);
            }
            else
                callback(new Erreur("selectServicesErreur", err));
            helper.close();

        });
    }
    static supprimerRole(selector, callback) {
        var helper = new CRUDHelper();
        helper.getTable('role').destroy(selector, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("supprimerRoleValidation", "Le role a bien été supprimé");
            else
                result = new Erreur("supprimerRoleErreur", err);
            callback(result);
            helper.close();
        });
    }
}
module.exports = RoleCRUD;