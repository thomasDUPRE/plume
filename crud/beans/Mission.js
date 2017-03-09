/**
 * Created by Thomas on 13/02/2017.
 */
class Mission {
    constructor(id, nom, description, dateDebut, dateFin, responsable){
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.date_debut = dateDebut;
        this.date_fin = dateFin;
        this.responsable = responsable;
    }
}
module.exports = Mission;