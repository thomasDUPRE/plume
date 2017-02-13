var express = require('express');
var router = express.Router();

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));
app.engine('html', require('ejs').renderFile);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Plume' });
});


module.exports = router;
