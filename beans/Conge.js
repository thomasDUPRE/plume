/**
 * Created by Thomas on 13/02/2017.
 */
/*class EtatConge extends Enum{}
Fonction.initEnum(['annulationEnvoye', 'annulationInvalideCS', 'annulationInvalideRH', 'annulationValideCS', 'annulationValideRH', 'brouillon', 'envoye', 'invalideCS', 'invalideDirigeant', 'invalideRH', 'valideCS', 'valideDirigeant', 'valideRH']);
*/
class Conge {
    constructor(id, etat, estPaye, dateDebut, dateFin){
        this.id = id;
        this.etat = etat;
        this.estPaye = estPaye;
        this.dateFin = dateFin;
        this.dateDebut = dateDebut;
    }
}
module.exports = Conge;