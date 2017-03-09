/**
 * Created by Thomas on 13/02/2017.
 */
class NoteDeFrais {
    constructor(id, date, idCollabo, mois, annee){
        this.id = id;
        this.date = date;
        this.id_collaborateur = idCollabo;
        this.mois = mois;
        this.annee = annee;
    }
}
module.exports = NoteDeFrais;