/*class CategorieFrais extends Enum {}
CategorieDemande.initEnum(['Logement', 'Nourriture', 'Transport','Autre']);
class EtatLigneDeFrais extends Enum {}
CategorieDemande.initEnum(['Brouillon', 'Envoye', 'Invalide_CS','Invalide_RH', 'Valide_CS','Valide_RH']);
*/
class LigneDeFrais { 
constructor(id, date , description, somme) {
        this.id = id;
        this.date = date;
        this.description=description;
        this.somme=somme;
    }
}
module.exports = LigneDeFrais;
