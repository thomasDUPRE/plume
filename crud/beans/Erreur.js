// /**
//  * Created by Thomas on 13/02/2017.
//  */
// var Enum = require('enumify').Enum;
// class TypeErreur extends Enum{}
// TypeErreur.initEnum(['ErreurConnexion']);

class Erreur{
    constructor(type, message) {
         this.type = type;
         this.message = message;
     }
}
Erreur.UNDEFINED = "La requête n'est pas défini";
Erreur.WRONG_PARAM = "Les paramètres ne sont pas corrects";

module.exports = Erreur;