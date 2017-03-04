/**
 * Created by Thomas on 13/02/2017.
 */
class Mission {
    constructor(id, nom, description, dateDebut, dateFin){
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.date_debut = dateDebut;
        this.date_fin = dateFin;
    }
}
module.exports = Mission;