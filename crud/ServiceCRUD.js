/**
 * Created by Thomas on 18/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var Service = require('./beans/Service');

class ServiceCRUD {
    static insererService(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('service').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("insererServiceValidation", "Le service a bien été créé");
            else
                result = new Erreur("insererServiceErreur", err);
            callback(result);
            helper.close();
        });
    }

    static modifService(selector, data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('service').update(selector, data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("modifServiceValidation", "Le service a bien été modifié");
            else
                result = new Erreur("modifServiceErreur", JSON.stringify(err));
            callback(result);
            helper.close();
        });
    }

    static selectServices(selector, callback){
        var helper = new CRUDHelper();

        helper.getTable('service').load(selector, function (err, vals) {
            //mysql callback

            if (!err){
                var result = [];
                for(var i = 0, len = vals.length; i < len; i++){
                    result.push(new Service(vals[i].id, vals[i].nom, vals[i].chef_service));
                }
                callback(result);
            }
            else
                callback(new Erreur("selectServicesErreur", err));
            helper.close();

        });
    }

    static supprimerService(selector, callback) {
        var helper = new CRUDHelper();
        helper.getTable('service').destroy(selector, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("supprimerServiceValidation", "Le service a bien été supprimé");
            else
                result = new Erreur("supprimerServiceErreur", err);
            callback(result);
            helper.close();
        });
    }
}
module.exports = ServiceCRUD;