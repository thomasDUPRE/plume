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

app.get('/joursRestants', function (req, res) {
        // if the request exists
        if (typeof req.query !== 'undefined' && req.query) {
            var selector = {};
            if(doesParamExist(req.query.id_collaborateur)) selector.id = parseInt(req.query.id_collaborateur);
            var CongeCRUD = require('../crud/CongeCRUD');

            CongeCRUD.selectJoursRestants(selector, function callback(result) {
                console.log("Result :" + JSON.stringify(result));
                // Send result to the browser
                res.send(JSON.stringify(result));
            })

        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));

    });


    app.post('/insererConge', function (req, res) {
        if (typeof req.query !== 'undefined' && req.query)
         {
            // if the parameters are ok
            if (doesParamExist(req.body.action_to_do) && doesParamExist(req.body.nb_jours_pris) && doesParamExist(req.body.date_debut) && doesParamExist(req.body.part_matin)  && doesParamExist(req.body.est_paye) && doesParamExist(req.body.revient_matin) && doesParamExist(req.body.motif) &&doesParamExist(req.body.date_fin)  ){
                console.log(req.body.date_fin);
                var data = {
                    date_demande: new Date() ,
                    date_debut : new Date(req.body.date_debut),
                    date_fin : new Date(req.body.date_fin),
                    part_matin : req.body.part_matin,
                    revient_matin : req.body.revient_matin,
                    est_paye : req.body.est_paye,
                    motif : req.body.motif,
                    nb_jours_choisis: req.body.nb_jours_pris,
                    id_etat_conge: (req.body.action_to_do == "send") ? 2 : 1 ,
                    motif : req.body.motif,
                    id_demandeur : req.session.profile.id 
                    
                };
                var CongeCRUD = require('../crud/CongeCRUD');

                CongeCRUD.insererConge(data, function callback(result){
                    console.log("Result :" + JSON.stringify(result));
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // // Display error
             else {
                 res.send(JSON.stringify(new Erreur("ParamErreur", Erreur.WRONG_PARAM)));
                 console.log("error");
             }
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


app.get('/modifierConge', function(req, res) {



        if (req.body && req.body.length !== 0) {
            if (doesParamExist(req.query.id) && doesParamExist(req.query.stat)) {
                  var CongeCRUD = require('../crud/CongeCRUD');
                var selector = { id : parseInt(req.query.id)};
                var data;
                if( doesParamExist(req.query.comment)){
				data = {
					motifRefus : req.query.comment,
                    id_etat_conge: parseInt(req.query.stat),
                    
                };
                }
                else{
                 data = {
                    id_etat_conge: parseInt(req.query.stat),
                    
                };
            }
               // Operation
                CongeCRUD.modifierConge(selector, data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("CongeErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("CongeErreur", "La requête est vide"))); 
    });



app.get('/selectCongeServ', function (req, res) {
        // if the request exists
        	var Conge = require('../crud/beans/Conge');

          var tmpCollaborateurs =[];
			var tmpConges =[];
        var CongeCRUD = require('../crud/CongeCRUD');
        var CollaborateurCRUD = require('../crud/CollaborateurCRUD');
        if (typeof req.query !== 'undefined' && req.query) {
            var selector = {};
            if(doesParamExist(req.query.id_service)) selector.id_service = parseInt(req.query.id_service);
            CollaborateurCRUD.selectCollaborateurs(selector,function (result){
            	var compteur=result.length;
            	for(var i = 0, len = result.length; i < len; i++){
            		if (doesParamExist(req.query.bool) && req.query.bool==1) 
        {
            	CongeCRUD.selectConge({id_demandeur:result[i].id },function (result2){
            	for(var j = 0, len2 = result2.length; j < len2; j++){
				tmpConges.push(new Conge(result2[j].id, result2[j].date_demande, result2[j].dateDebut, result2[j].dateFin, result2[j].estPaye, result2[j].id_etat_conge, result2[j].part_matin, result2[j].revient_matin, result2[j].motif,result2[j].id_demandeur));          
  				
  				}
            	compteur--;
            	if(compteur<=0){
            		res.send(JSON.stringify(tmpConges));
            	}
            });
        }


else if (doesParamExist(req.query.bool) && req.query.bool==0) 
  				{
  					compteur=0;
  					for (var t = 0, len = result.length; t < len; t++){
  						if(parseInt(result[t].role.id)==4)
  							compteur++;
  					}
  				  					if(parseInt(result[i].role.id)==4)
        {   
		  CongeCRUD.selectConge({id_demandeur:result[i].id },function (result2){
            	for(var j = 0, len2 = result2.length; j < len2; j++){
				tmpConges.push(new Conge(result2[j].id, result2[j].date_demande, result2[j].date_debut, result2[j].date_fin, result2[j].est_paye, result2[j].id_etat_conge, result2[j].part_matin, result2[j].revient_matin, result2[j].motif,result2[j].id_demandeur));          
  				
  				}
            	compteur--;
            	if(compteur<=0){
            		res.send(JSON.stringify(tmpConges));
            	}
            });

  		}
  				
  			}
            }
          	});
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
			var table=[];
            if(doesParamExist(req.query.id)) selector.id_demandeur = parseInt(req.query.id);
            var CongeCRUD = require('../crud/CongeCRUD');
            var CollaborateurCRUD = require('../crud/CollaborateurCRUD');

            CongeCRUD.selectConge({}, function callback(result) {
            	for(var i = 0, len = result.length; i < len; i++){
                    tmpConges.push(new Conge(result[i].id, result[i].date_demande, result[i].date_debut, result[i].date_fin, result[i].est_paye, result[i].id_etat_conge, result[i].part_matin, result[i].revient_matin, result[i].motif,result[i].id_demandeur));
                }
                             

res.send(tmpConges);
                            

            })
                CollaborateurCRUD.selectCollaborateurs({}, function callback(result) {
                // Send result to the browser
              tmpCollaborateurs=result.slice(0);
            })
                console.log("Result :" + JSON.stringify(tmpConges));

        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("RequeteErreur", Erreur.UNDEFINED)));
    });



    app.post('/modifierEtatConge', function(req, res) {
        if (req.body && req.body.length !== 0) {
            
            if (req.body.id && req.body.id_etat_conge) {
                
                var selector = { id : req.body.id };
                var data = {
                    id_etat_conge: req.body.id_etat_conge
                };
               // Operation
                CongeCRUD.modifierEtatConge(selector, data, function callback(result) {
                    // Send result to the browser
                    res.send(JSON.stringify(result));
                });
            }
            // Display error
            else res.send(JSON.stringify(new Erreur("congeErreur", "Les paramètres ne sont pas corrects")));
        }
        // Display Error
        else res.send(JSON.stringify(new Erreur("CongeErreur", "La requête est vide")));
     
    });
}