/**
 * Created by Thomas on 13/02/2017.
 */
/*class EtatConge extends Enum{}
Fonction.initEnum(['annulationEnvoye', 'annulationInvalideCS', 'annulationInvalideRH', 'annulationValideCS', 'annulationValideRH', 'brouillon', 'envoye', 'invalideCS', 'invalideDirigeant', 'invalideRH', 'valideCS', 'valideDirigeant', 'valideRH']);
*/
class Conge {
    constructor(id, date_demande, dateDebut, dateFin,estPaye, id_etat_conge, part_matin, revient_matin, motif,id_demandeur ){
        this.id = id;
        this.date_demande=date_demande ;     
        this.estPaye = estPaye;
        this.dateFin = dateFin;
        this.dateDebut = dateDebut;
		this.id_etat_conge=id_etat_conge;
		this.part_matin=part_matin;
		this.revient_matin=revient_matin;
		this.motif=motif;
		this.id_demandeur=id_demandeur;


    }
}
module.exports = Conge;