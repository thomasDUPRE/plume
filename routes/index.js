var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Plume' });
});

router.get('/apanel', function(req, res) {
  res.render('apanel', { title: 'Plume' });
});

router.post('/login', function(req, res) {
  var username = req.param('username');
  var password = req.password('password');

  // Verify password in the DB

  console.log("");

  res.json({ user: 'tobi' });
});



module.exports = router;
