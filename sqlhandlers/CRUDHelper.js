/**
 * Created by Thomas on 13/02/2017.
 */
var mysql = require('mysql');
class CRUDHelper {
    constructor() {
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'plume'
        });
        this.connection.connect();
    }
    close(){
        this.connection.end();
    }
    doQuery(query, callback){
        this.connection.query(query, callback);
    }
}
module.exports = CRUDHelper;
