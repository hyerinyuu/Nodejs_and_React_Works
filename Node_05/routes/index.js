var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // home controller와 같은 역할인것 같음.
  res.redirect("/book")
});

module.exports = router;
