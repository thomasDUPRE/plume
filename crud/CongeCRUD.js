var CRUDHelper = require('./CRUDHelper');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');
var Conge = require('./beans/Conge');

class CongeCRUD {
    static insererConge(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('conge').create(data, function (err) {
            //mysql callback
            var result;
            if (!err)
            result = new Validation("CreerConge", "Le conge a bien été créé");
            else
                result = new Erreur("CreerCongeErreur", err);
            callback(result);
        });
    }
        static selectConge(data, callback){
        var helper = new CRUDHelper();
        // session get my id
        helper.getTable('conge').load(data, function (err, vals) {
            //mysql callback
            if (!err){
                var result = [];
                for(var i = 0, len = vals.length; i < len; i++){
                    result.push(new Conge(vals[i].id, vals[i].date_demande, vals[i].date_debut, vals[i].date_fin, vals[i].est_paye, vals[i].id_etat_conge, vals[i].part_matin, vals[i].revient_matin, vals[i].motif,vals[i].id_demandeur));
                	  }
                callback(result);
            }
            else
                callback(new Erreur("RecupMesCongeErreur", err));

        });
    }
        static selectCongeService(data, callback){
        var helper = new CRUDHelper();
        // session get my id
        helper.getTable('conge').load(data, function (err, vals) {
            //mysql callback
            if (!err){
                var result = [];
                for(var i = 0, len = vals.length; i < len; i++){
                    result.push(new Conge(vals[i].id, vals[i].date_demande, vals[i].date_debut, vals[i].date_fin, vals[i].est_paye, vals[i].id_etat_conge, vals[i].part_matin, vals[i].revient_matin, vals[i].motif,vals[i].id_demandeur));
                      }
              
            }
            else
                callback(new Erreur("RecupMesCongeErreur", err));

        });

 /*helper.getTable('collaborateur').load({}}, function (err, vals) {
            //mysql callback
            if (!err){
                var resultBis = [];
                for(var i = 0, len = vals.length; i < len; i++){
                    resultBis.push(new Collaborateur(vals[i].id, vals[i].nom, vals[i].prenom, vals[i].service, null, null, vals[i].telephone, vals[i].mail, vals[i].nb_jours_restants));
                      }
            }
            else
                callback(new Erreur("RecupMesCollaborateursErreur", err));

        });
                var resultFinal = [];

for(var i = 0, len = result.length; i < len; i++){
    if(result[i].id_demandeur)
                    resultFinal.push(result[i]);
                      }*/

          callback(result);
    }

    static selectMesCongeATraiter(data, callback){
        var helper = new CRUDHelper();
        // session get my id
        helper.getTable('conge').select(data, function (err, vals) {
            //mysql callback

            if (!err){
                var result = [];
                for(var i = 0, len = vals.length; i < len; i++){
                    result.push(new Conge(vals[i].id, vals[i].date_demande, vals[i].date_debut, vals[i].date_fin, vals[i].est_paye, vals[i].id_etat_conge, vals[i].part_matin, vals[i].revient_matin, vals[i].motif,vals[i].id_demandeur));
                }
                callback(result);
            }
            else
                callback(new Erreur("recupererMesConge", err));

        });
    }
    static selectUnConge(data, callback){
        var helper = new CRUDHelper();
        helper.getTable('conge').select(data, function (err, vals) {
            //mysql callback

            if (!err){
                var result = new Conge(vals[i].id, vals[i].date_demande, vals[i].date_debut, vals[i].date_fin, vals[i].est_paye, vals[i].id_etat_conge, vals[i].part_matin, vals[i].revient_matin, vals[i].motif,vals[i].id_demandeur);
                callback(result);
            }
            else
                callback(new Erreur("recupererUnCongeErreur", err));

        });
    }

    static modifierConge(selector, data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('conge').update(selector, data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("modifierConge", "Le conge a bien été modifié");
            else
                result = new Erreur("modifiercongeErreur", err);
            callback(result);
        });
    }

    static supprimerConge(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('conge').delete(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("supprimer conge", "Le conge a bien été supprimée");
            else
                result = new Erreur("supprimerCongeErreur", err);
            callback(result);
        });
    }}

module.exports = CongeCRUD;