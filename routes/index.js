var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Plume' });
});

router.get('/apanel', function(req, res, next) {
  res.render('apanel', { title: 'Plume' });
});



module.exports = router;
