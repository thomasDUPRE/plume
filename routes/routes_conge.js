/**
 * Created by Thomas on 13/02/2017.
 */
// Routes Congés
module.exports = function(app) {
    var Erreur = require('../crud/beans/Erreur');

    function doesParamExist(param) {
        if (typeof param !== 'undefined' && param) return true;
        return false;
    }
    function setResponse(res, callback){
        if(typeof  req.session.profile !== 'undefined' && req.session.profile){
            callback();
        }
        else res.redirect('/');
    }


app.get('/selectConge', function (req, res) {
        // if the request exists
        if (typeof req.query !== 'undefined' && req.query) {
            var selector = {};
            if(doesParamExist(req.query.id)) selector.id_demandeur = parseInt(req.query.id);
            var CongeCRUD = require('../crud/CongeCRUD');

            CongeCRUD.selectConge(selector, function callback(result) {
                console.log("Result :" + JSON.stringify(result));
                // Send result to the browser
                res.send(JSON.stringify(result));
            })

        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));

    });
app.get('/selectCongeService', function (req, res) {
        // if the request exists
        if (typeof req.query !== 'undefined' && req.query) {
            var selector = {};
            if(doesParamExist(req.query.id)) selector.id_demandeur = parseInt(req.query.id);
            var CongeCRUD = require('../crud/CongeCRUD');

            CongeCRUD.selectCongeService(selector, function callback(result) {
                console.log("Result :" + JSON.stringify(result));
                // Send result to the browser
                res.send(JSON.stringify(result));
            })

        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));

    });


}