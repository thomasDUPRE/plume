/**
 * Created by Thomas on 25/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var Notification = require('./beans/Notification');

class NotificationCRUD{
    static insererNotification(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('notification').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("insererNotificationValidation", "La/Les notification(s) a/ont bien été créé");
            else
                result = new Erreur("insererNotificationErreur", err);
            callback(result);
            helper.close();
        });
    }
    static modifNotification(selector, data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('notification').update(selector, data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("modifNotificationValidation", "La notification a bien été modifié");
            else
                result = new Erreur("modifNotificationErreur", JSON.stringify(err));
            callback(result);
            helper.close();
        });
    }

    static selectNotifications(selector, callback){
        var helper = new CRUDHelper();

        helper.getTable('notification').load(selector, function (err, vals) {
        //mysql callback

        if (!err){
            var result = [];
            for(var i = 0, len = vals.length; i < len; i++){
                result.push(new Notification(vals[i].id, vals[i].sujet, vals[i].contenu, vals[i].date_notification, vals[i].vu));
            }
            callback(result);
        }
        else
            callback(new Erreur("selectNotificationsErreur", err));
        helper.close();

        });
    }
    static supprimerNotification(selector, callback) {
        var helper = new CRUDHelper();
        helper.getTable('notification').destroy(selector, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("supprimerNotificationValidation", "La notification a bien été supprimé");
            else
                result = new Erreur("supprimerNotificationErreur", err);
            callback(result);
            helper.close();
        });
    }

}
module.exports = NotificationCRUD;