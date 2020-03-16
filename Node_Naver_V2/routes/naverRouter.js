var naver = require('../config/naver_secret')
var express = require('express')
var router = express.Router()
// package.json에 다운받은 request middle ware
var request = require('request')
var bookVO = require('../models/bookVO')

var reqOptions = (api_url) =>{
    var options = {
        url : api_url,
        headers : {
            'X-Naver-Client-Id' : naver.client_id,
            'X-Naver-Client-Secret' : naver.client_secret

        }
    }
    return options
}

module.exports = (app) => {
    router.get('/', (req,res) => {
        res.json(naver)
    })

    router.get('/book', (req,res)=> {
        let searchName = req.query.search
        let api_url = naver.book_url
        api_url += '?query=' + encodeURI(searchName)
        
        request.get(reqOptions(api_url), (err,response,body) => {
            
            if(err){
                console.log(err)
                res.send(response.statusMessage)
            }else if(response.statusCode == 200){
                var naverJson = JSON.parse(body).items
                //res.json(naverJson)
                
                // DB에 값이 있음(DB에 저장된 값을 추출해서 보여주기)
                if(Object.keys(result).length > 0) {
                    naverJson.forEach(function(books){
                        var bookVO = new bookVO
                        bookVO.save((err,data)=>{
                            res.render('book/list', {books:naverJson})
                        })
                    })
                // DB에 값이 없음(naver APi에서 검색해서 조회한 후)
                // DB에 저장해주기
                }else{
                    

                }
                
            }else{
                res.send("unKnown Error response")
            }
        })
    })

    return router
}

