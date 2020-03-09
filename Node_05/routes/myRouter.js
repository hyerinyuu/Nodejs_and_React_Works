var express = require("express")
var router = express.Router()

// mongoose로 설정한 model을 사용하기 위해
// bookVO라는 이름의 객체 생성
var bookVO = require("../models/book")
// app.js에 db연결작업 수행하기


router.get("/", function(req,res){
    bookVO.find({}, function(err, data){
        res.render("book/list", {books:data})
    })
})

router.get("/insert", function(req,res){

    var book = new bookVO()
    res.render("book/write", {
        book:book,btnText:'추가'
    })
})

router.post("/insert", function(req,res){
   var newVO = new bookVO(req.body)

   newVO.save(req.body, function(err,data){
        res.redirect("/book")
   })
}) // router.post("/insert")

router.get("/name", function(req,res){
    let name = req.query.name
    bookVO.findOne({BName:name}, function(err,data){
        res.json(data)
    })
})

router.get('/update/:id', function(req,res){
    let id = req.params.id
    bookVO.findOne({_id:id}, function(err,data){
        res.render("book/write", 
            {book:data,btnText:'수정'}
        )
    })
})

router.post("/update/:id", function(req,res){

    var id = req.params.id
    bookVO.update({_id:id}, {$set:req.body},
            function(err,data){
               res.redirect("/book")
            })

}) // router.post("/update")

router.get("/delete/:id", function(req, res){
    let id = req.params.id
    bookVO.deleteOne({_id:id},  function(err,data){
        res.redirect("/book")
    })
})

module.exports= router
