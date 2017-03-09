/**
 * Created by Thomas on 20/02/2017.
 */
class Notification{
    constructor(id, sujet, contenu, date_notification, vu){
        this.id = id;
        this.sujet = sujet;
        this.contenu = contenu;
        this.date_notification = date_notification;
        this.vu = vu;
    }
}
module.exports = Notification;