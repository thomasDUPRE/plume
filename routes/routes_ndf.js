/**
 * Created by Thomas on 13/02/2017.
 */
// Routes Note de Frais
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }

}