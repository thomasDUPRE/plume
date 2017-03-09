/**
 * Created by Thomas on 16/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var Collaborateur = require('./beans/Collaborateur');
var CollaborateurLogin = require('./beans/CollaborateurLogin');
var ServiceCRUD = require('./ServiceCRUD');
var RoleCRUD = require('./RoleCRUD');

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
                ServiceCRUD.selectServices({}, function(services){
                    RoleCRUD.selectRoles({}, function(roles) {

                        var result = [];
                        for (var i = 0, len = vals.length; i < len; i++) {
                            var service = services.filter(function (el){
                                return (el.id == vals[i].id_service);
                            });
                            var role = roles.filter(function (el){
                                return (el.id == vals[i].id_role);
                            });

                            result.push(new Collaborateur(vals[i].id, vals[i].nom, vals[i].prenom, service[0], role[0], undefined, vals[i].telephone, vals[i].mail, vals[i].nb_jours_restants));
                        }
                        callback(result);
                    });

                });
            }
            else
                callback(new Erreur("selectCollaborateursErreur", err));
            helper.close();

        });
    }
    static selectMDPCollaborateur(selector, callback){
        var helper = new CRUDHelper();

        helper.getTable('collaborateur').load(selector, function (err, vals) {
            //mysql callback
            var result;
            if (!err){
                if(vals.length == 0){
                    result = new Erreur("MauvaisUtilisateur", "Cet utilisateur n'existe pas !");
                    callback(result);
                    helper.close();
                }
                else{
                    ServiceCRUD.selectServices({id:vals[0].id_service}, function(service){
                        RoleCRUD.selectRoles({id:vals[0].id_role}, function(role){                        
                            //console.log("admin:"+admin)
                            result = new CollaborateurLogin(vals[0].id, vals[0].nom, vals[0].prenom, service[0], role[0], vals[0].admin, vals[0].telephone, vals[0].mail, vals[0].nb_jours_restants, vals[0].mot_de_passe);
                            callback(result);
                            helper.close();
                            
                        });
                    });

               }
            }

            else {
                result = new Erreur("selectMDPCollaborateurErreur", err);
                callback(result);
                helper.close();
            }


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

    static adminCollaborateur(selector, callback) {
        var helper = new CRUDHelper();
        helper.getTable('admin').load(selector, function (err, vals) {
            //mysql callback
            var result;
            if (!err && vals && vals.length != 0)
                result = true;
            else
                result = false;
            callback(result);
            helper.close();
        });
    }

}

module.exports = CollaborateurCRUD;