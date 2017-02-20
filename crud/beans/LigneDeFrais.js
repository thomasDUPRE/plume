/*class CategorieFrais extends Enum {}
CategorieDemande.initEnum(['Logement', 'Nourriture', 'Transport','Autre']);
class EtatLigneDeFrais extends Enum {}
CategorieDemande.initEnum(['Brouillon', 'Envoye', 'Invalide_CS','Invalide_RH', 'Valide_CS','Valide_RH']);
*/
class LigneDeFrais { 
constructor(id, categorie , etat, id_note, id_mission, justificatif) {
        this.id = id;
        this.id_categorie_frais = categorie;
        this.id_etat_ligne_frais = etat;
        this.id_note_frais = id_note;
        this.id_mission = id_mission;
        this.justificatif = justificatif;
    }
}
module.exports = LigneDeFrais;
