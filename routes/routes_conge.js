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


    app.get('/insererConge', function (req, res) {
        if (typeof req.query !== 'undefined' && req.query) {
            // if the parameters are ok
            if (doesParamExist(req.query.id) && doesParamExist(req.query.date_demande) &&doesParamExist(req.query.date_debut) && doesParamExist(req.query.part_matin) && doesParamExist(req.query.id_etat_conge) && doesParamExist(req.query.est_paye) && doesParamExist(req.query.revient_matin) && doesParamExist(req.query.motif) &&doesParamExist(req.query.date_fin) &&  oesParamExist(req.query.id_demandeur) ){
                var data = {
                    id : req.query.id,
                    date_demande : req.query.date_demande,
                    date_debut : req.query.date_debut,
                    part_matin : req.query.part_matin,
                    id_etat_conge : req.query.id_etat_conge,
                    est_paye : req.query.est_paye,
                    revient_matin : req.query.revient_matin,
                    motif : req.query.motif,
                    date_fin : req.query.date_fin,
                    id_demandeur : req.query.id_demandeur,
                };
                var CongeCRUD = require('../crud/CongeCRUD');

                CongeCRUD.insererConge(data, function callback(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });

            }
            // Display error
            else res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });

app.get('/deleteConge', function (req, res) {
        // if the request exists
        if (typeof req.query !== 'undefined' && req.query) {
            var selector = {};
            if(doesParamExist(req.query.id)) selector.id = parseInt(req.query.id);
            var CongeCRUD = require('../crud/CongeCRUD');

            CongeCRUD.deleteConge(selector, function callback(result) {
            // Send result to the browser
            res.send(JSON.stringify(result));
            })
        }
     
       // Display Error
       else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));

    });
app.get('/selectCongeService', function (req, res) {
	var Conge = require('../crud/beans/Conge');
        // if the request exists
        if (typeof req.query !== 'undefined' && req.query) {
            var selector = {};
            var tmpCollaborateurs =[];
			var tmpConges =[];
            if(doesParamExist(req.query.id)) selector.id_demandeur = parseInt(req.query.id);
            var CongeCRUD = require('../crud/CongeCRUD');
            var CollaborateurCRUD = require('../crud/CollaborateurCRUD');

            CongeCRUD.selectConge({}, function callback(result) {
            	for(var i = 0, len = result.length; i < len; i++){
                    tmpConges.push(new Conge(result[i].id, result[i].date_demande, result[i].date_debut, result[i].date_fin, result[i].est_paye, result[i].id_etat_conge, result[i].part_matin, result[i].revient_matin, result[i].motif,result[i].id_demandeur));
                }

            })

                CollaborateurCRUD.selectCollaborateurs({}, function callback(result) {
                // Send result to the browser
              tmpCollaborateurs=result.slice(0);
            })
                console.log("Result :" + JSON.stringify(tmpConges));

              res.send(JSON.stringify(tmpConges));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });
}