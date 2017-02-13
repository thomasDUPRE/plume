/**
 * Created by Thomas on 13/02/2017.
 */
var mysql = require('mysql');
var CRUD = require('mysql-crud');

class CRUDHelper {
    constructor() {
        // Initialize pool
        this.pool      =    mysql.createPool({
            connectionLimit : 10,
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'plume',
            debug    :  false
        });


    }
    getTable(table){
        return CRUD(this.pool, table);
    }
    close(){
        this.pool.end();
    }
}
module.exports = CRUDHelper;
