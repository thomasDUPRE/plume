/**
 * Created by Thomas on 13/02/2017.
 */
/*class Role extends Enum{}
Role.initEnum(['COLLABORATEUR', 'CHEF_SERVICE', 'CHEF_SERVICE_A', 'DIRIGEANT', 'ADMIN']);

class Fonction extends Enum{}
Fonction.initEnum(['COMPTA', 'RH', 'INFO', 'LOGIS', 'NULL']);*/

class Collaborateur{
    constructor(id, nom, prenom, role, fonction, telephone, mail, nb_jours_restants){
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.role = role;
        this.fonction = fonction;
        this.telephone = telephone;
        this.mail = mail;
        this.nb_jours_restants = nb_jours_restants;
    }

    toString(){
        return this.prenom + " " + this.nom;
    }
}
module.exports = Collaborateur;