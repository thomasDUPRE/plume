/**
 * Created by Thomas on 25/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var Notification = require('./beans/Notification');

class NotificationCRUD{
    static insererBoxNotification(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('notification_box').create(data, function (err) {
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



    static insererNotification(data, callback) {
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
}
module.exports = NotificationCRUD;