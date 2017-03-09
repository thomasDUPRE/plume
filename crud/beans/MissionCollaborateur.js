/**
 * Created by Thomas on 13/02/2017.
 */
class MissionCollaborateur {
    constructor(id_collaborateur, id_mission, dateDebut, dateFin){
        this.id_collaborateur = id_collaborateur;
        this.id_mission = id_mission;
        this.date_debut_mission = dateDebut;
        this.date_fin_mission = dateFin;
    }
}
module.exports = MissionCollaborateur;