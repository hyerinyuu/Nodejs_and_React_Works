var express = require('express')
var router = express.Router()
var bbsVO = require('../models/bbsVO').default

var {bbsVO} = require("../models")

router.get('/', function(req, res){
    // sequelize가 ver4에서 ver5로 넘어가면서 find()함수가 삭제됨
    // findAll()을 사용해야함
    bbsVO.findAll()
    .then(function(bbsList){
        //res.json(bbsList)
        res.render('index', {bbsList:bbsList})
    })
})

router.get("/insert", function(req,res){
    let bbsVO = {
        b_date : '2020-03-10',
        b_time : '11:04:19',
    }
    res.render('bbs/write', {
        bbsVO : bbsVO
    })
})

router.post('/insert', function(req,res){
    bbsVO.create({
        b_writer : req.body.b_writer,
        b_date : req.body.b_date,
        b_time : req.body.b_time,
        b_subject : req.body.b_subject,
        b_text : req.body.b_text
    })
    .then(function(result){
        res.redirect('/')
    })
})

router.get('/view/:id', function(req,res){
    let id = req.params.id
    // 1. b_id = id인 데이터를 조회하여
    bbsVO.findOne({
        // mongoose는 값만 넣어주면 되었지만 mysql은 이렇게 해야함
        where : {b_id : id}
    })
    // 2. 있으면 bbs에 담고
    .then(function(bbs){
        // 3. 다시 해당 레코드의 b_count값을 1 증가시키고
        bbsVO.update(
            {b_count:bbs.b_count + 1}, // b_id가 id와 일치하면 count update 수행
            {where : {b_id : bbs.b_id}}  // 조건
        )
        // 4. 그 데이터를 view로 보내라
        .then(function(result){ // count update가 이루어지고 나면
            res.render("bbs/view", {bbs:bbs})
        })
    })
})

router.get("/update/:id", function(req,res){
    let id = req.params.id
    bbsVO.findOne({
        // b_id와 id값이 일치하면
        where : {b_id : id}
    })
    .then(function(bbs){
        res.render('bbs/write', {bbsVO:bbs})
    })
    // Exception이 발생하면 웹페이지에 오류를 보여라
    .catch(function(err){
        res.send(err)
    })
})

router.post("/update/:id", function(req,res){
    let id = req.params.id
    bbsVO.update({
        b_writer : req.body.b_writer,
        b_date : req.body.b_date,
        b_time : req.body.b_time,
        b_subject : req.body.b_subject,
        b_text : req.body.b_text
    }, 
    {where : {b_id : id}}
    )
    .then(function(result){
        res.redirect('/bbs/view/' + id)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.get("/delete/:id", function(req,res){
    let id = req.params.id

    bbsVO.destroy({
        where : {b_id:id}
    })
    .then(function(result){
        res.redirect('/bbs')
    })
})

module.exports = router