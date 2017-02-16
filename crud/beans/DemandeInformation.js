/*class CategorieDemande extends Enum {}
CategorieDemande.initEnum(['Conge', 'Frais', 'General']);
  */

class DemandeInformation {
constructor(id, auteur, typeDemande, sujet, contenu) {
        this.id = id;
        this.auteur = auteur;
        this.typeDemande = typeDemande;
        this.sujet=sujet;
        this.contenu=contenu;

    }
}
module.exports = DemandeInformation;