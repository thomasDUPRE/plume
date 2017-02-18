/**
 * Created by Thomas on 13/02/2017.
 */
class Service{
    constructor(id, nom, chef_service){
        this.id = id;
        this.nom = nom;
        this.chef_service = chef_service;
    }
    toString(){
        return "Service "+this.nom;
    }
}
module.exports = Service;