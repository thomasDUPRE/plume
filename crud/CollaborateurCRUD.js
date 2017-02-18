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
                result = new Validation("CreerDemandeValidation", "La demande d'information a bien été créée");
            else
                result = new Erreur("CreerDemandeErreur", err);
            callback(result);
        });
    }


}

module.exports = CollaborateurCRUD;