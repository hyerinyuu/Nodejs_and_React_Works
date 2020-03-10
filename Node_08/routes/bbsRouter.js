var express = require('express')
var router = express.Router()
var bbsVO = require('../models/bbsVO')

router.get('/', function(req, res){
    res.end('list')
})

module.exports = router