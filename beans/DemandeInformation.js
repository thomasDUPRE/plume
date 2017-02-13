/*class CategorieDemande extends Enum {}
CategorieDemande.initEnum(['Conge', 'Frais', 'General']);
  */

class DemandeInformation {
constructor(id, categorieDemande , contenu, sujet ) {
        this.id = id;
        this.categorieDemande = categorieDemande;
        this.contenu=contenu;
        this.sujet=sujet;
    }
}
module.exports = DemandeInformation;