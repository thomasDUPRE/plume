/**
 * Created by Thomas on 13/02/2017.
 */
// Routes principales
module.exports = function(app) {

    app.get('/', function (req, res) {
        // Homepage
        res.sendFile(__dirname + '/views' + '/home.html');
    });
}