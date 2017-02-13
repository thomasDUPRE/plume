/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
var DemandeInformation = require('./beans/DemandeInformation');
var Validation = require('./beans/Validation');
var Erreur = require('./beans/Erreur');

class DemandeInfoCRUD {
    static creerDemande() {
        var helper = new CRUDHelper();
        helper.doQuery("INSERT", function(err, rows, fields){
            //callback
            if (!err)
                console.log('The solution is: ', rows);
            else
                console.log('Error while performing Query.');
        });
        helper.close();
    }
    static modifierDemande(){

    }
    static selectionnerDemandeParID(){

    }
    static selectionnerDemandeParID(){

    }
    static selectionnerDemandeParID(){

    }
    static supprimerDemande(){

    }
}
module.exports = DemandeInfoCRUD;