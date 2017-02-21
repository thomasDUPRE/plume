/**
 * Created by Thomas on 21/02/2017.
 */
class Role{
    constructor(id, nom){
        this.id = id;
        this.nom = nom;
    }
    toString(){
        return "Role "+this.nom;
    }
}
module.exports = Role;