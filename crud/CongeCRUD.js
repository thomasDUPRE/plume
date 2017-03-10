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
        var test=[];
        // session get my id
        helper.getTable('conge').load(data, function (err, vals) {
            //mysql callback
            if (!err){
                var result = [];
                for(var i = 0, len = vals.length; i < len; i++){
                    result.push(new Conge(vals[i].id, vals[i].date_demande, vals[i].date_debut, vals[i].date_fin, vals[i].est_paye, vals[i].id_etat_conge, vals[i].part_matin, vals[i].revient_matin, vals[i].motif,vals[i].id_demandeur,vals[i].motifRefus));
                	  }
                test=JSON.parse(JSON.stringify(result));
                callback(test);
            }
            else
                callback(new Erreur("RecupMesCongeErreur", err));


        });
    }

    static modifierConge(selector, values, callback) {
        var helper = new CRUDHelper();
        console.log(values);
        helper.getTable('conge').update(selector, values, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("ModifierCongeValidation", "Le conge a bien été modifiée");
            else
                result = new Erreur("ModifierCongeErreur", err);
            callback(result);
        });
    }

    static selectJoursRestants(data, callback){
 var helper = new CRUDHelper();

 helper.getTable('collaborateur').load(data, function (err, vals) {
            //mysql callback
            if (!err){
                var result = [];
                for(var i = 0, len = vals.length; i < len; i++){
                    var service = services.filter(function (el){
                                return (el.id == vals[i].id_service);
                            });
                            var role = roles.filter(function (el){
                                return (el.id == vals[i].id_role);
                            });

                            result.push(new Collaborateur(vals[i].id, vals[i].nom, vals[i].prenom, service[0], role[0], undefined, vals[i].telephone, vals[i].mail, vals[i].nb_jours_restants));
                              }
                test=JSON.parse(JSON.stringify(result));
                callback(test);
            }
            else
                callback(new Erreur("RecupMesCongeErreur", err));


        });

    }
        static selectCongeService(data, callback){
        var conge = new CongeCRUD();
        
        // session get my id
                    var selector = {};
  var resultTmp = [];
    var result = [];
        helper.getTable('conge').load({}, function (err, vals) {
            //mysql callback
            if (!err){
             
                for(var i = 0, len = vals.length; i < len; i++){
                    result.push(new Conge(vals[i].id, vals[i].date_demande, vals[i].date_debut, vals[i].date_fin, vals[i].est_paye, vals[i].id_etat_conge, vals[i].part_matin, vals[i].revient_matin, vals[i].motif,vals[i].id_demandeur));
                      }
                    // la j'ai les conges , je veux les recuperer sans faire de callback dans le load pour faire la meme chose pour les collaborateurs pour faire apres le tri avec l'id de service que walid me passe 

            }
            else
                callback(new Erreur("RecupMesCongeErreur", err));

  callback (result);

        });



       // callback(resultTmp);
/*
 helper.getTable('collaborateur').load({}, function (err, vals) {
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
    for(var j = 0, len = resultBis.length; j < len; j++){
    if(result[i].id_demandeur)
                    resultFinal.push(result[i]);
                      }
                  }*/
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
        var test;
        helper.getTable('conge').select(data, function (err, vals) {
            //mysql callback

            if (!err){
                var result = new Conge(vals[i].id, vals[i].date_demande, vals[i].date_debut, vals[i].date_fin, vals[i].est_paye, vals[i].id_etat_conge, vals[i].part_matin, vals[i].revient_matin, vals[i].motif,vals[i].id_demandeur);
                test=clone(result);
            }
            else
                callback(new Erreur("recupererUnCongeErreur", err));

        });
        callback(test);
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

    static deleteConge(data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('conge').destroy(data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("supprimer conge", "Le conge a bien été supprimée");
            else
                result = new Erreur("supprimerCongeErreur", err);
            callback(result);
        });
    }

    static modifierEtatConge(selector, data, callback) {
        var helper = new CRUDHelper();
        helper.getTable('conge').update(selector, data, function (err) {
            //mysql callback
            var result;
            if (!err)
                result = new Validation("EtatConge", "L'état du conge a bien été validé");
            else
                result = new Erreur("EtatcongeErreur", err);
            callback(result);
        });
    }

}

module.exports = CongeCRUD;