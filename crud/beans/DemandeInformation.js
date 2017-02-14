/*class CategorieDemande extends Enum {}
CategorieDemande.initEnum(['Conge', 'Frais', 'General']);
  */

class DemandeInformation {
constructor(id, typeDemande, contenu, sujet ) {
        this.id = id;
        this.typeDemande = typeDemande;
        this.contenu=contenu;
        this.sujet=sujet;
    }
}
module.exports = DemandeInformation;