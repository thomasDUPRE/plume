/**
 * Created by Thomas on 13/02/2017.
 */
var Enum = require('enumify').Enum;
class TypeErreur extends Enum{}
TypeErreur.initEnum(['ErreurConnexion']);

class Erreur{
    constructor(type, message) {
        this.type = type;
        this.message = message;
    }
}
module.exports = Erreur;