var express = require("express")
var router = express.Router()

var bookVO = require('../models/bookVO')

// selectAll 전체 리스트 보기
router.get('/', function(req,res){
    // bookVO.find({}, function(err,books){
    //     res.render('book/list', {books:books})
    // })

    // 정렬
    // mongoose 5.x미만에서는 .exec대신 .then을 사용하고
    //          5.x이상에서는 .exec를 사용한다.
    // .sort부분도 5.x 이상에서는 .sort({칼럼 : 'asc'}), .sort({칼럼 : 'desc'})를 사용하며
    //             5.x 미만에서는 .sort({칼럼 : '1'}) ==> asc, '-1'은 desc로 사용한다. 
    bookVO.find({})
        .limit(10).skip(0)
        .sort({bTitle:'asc'}) // 1:asc, -1:desc
        .exec(function(err, books){
            res.render('book/list', {books:books})
        })
})
router.get('/insert',function(req,res){
    var book = new bookVO()
    res.render('book/write', {book:book, formTitle:'INSERT'})
})

router.post('/insert', function(req,res){
    var book = new bookVO(req.body)
    book.save(function(err,data){
        res.redirect('/book')
    })
})

router.get('/update/:id', function(req,res){
    var id = req.params.id
    bookVO.findOne({_id:id}, function(err,book){
        res.render('book/write', {book:book, formTitle:'UPDATE'})
    })
})

router.post('/update/:id', function(req,res){
    var id = req.params.id
    bookVO.update({_id:id}, {$set:req.body}, function(err,data){
        res.redirect('/book')
    })
})

router.get("/delete/:id", function(req, res){
    let id = req.params.id
    bookVO.deleteOne({_id:id},  function(err,data){
        res.redirect("/book")
    })
})

module.exports= router
