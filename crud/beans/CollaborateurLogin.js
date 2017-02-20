/**
 * Created by Thomas on 20/02/2017.
 */
var Collaborateur = require('./Collaborateur');
class CollaborateurLogin extends Collaborateur{
    constructor(id, nom, prenom, service, role, fonction, telephone, mail, nb_jours_restants, mot_de_passe){
        super(id, nom, prenom, service, role, fonction, telephone, mail, nb_jours_restants);
        this.mot_de_passe = mot_de_passe;

    }
    getCollaborateur(){
        return new Collaborateur(this.id, this.nom, this.prenom, this.service, this.role, this.fonction, this.telephone, this.mail, this.nb_jours_restants);
    }
}
module.exports = CollaborateurLogin;