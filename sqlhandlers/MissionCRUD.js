/**
 * Created by Thomas on 13/02/2017.
 */
var CRUDHelper = require('./CRUDHelper');
class MissionCRUD {
    static fetchMission(){
        var handler = new CRUDHelper();
        handler.doQuery("SELECT * FROM categorie_demande", function(err, rows, fields){
            //callback
            if (!err)
                console.log('The solution is: ', rows);
            else
                console.log('Error while performing Query.');
        });
        handler.close();
    }
}
module.exports = MissionCRUD;