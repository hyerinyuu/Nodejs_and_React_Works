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
        let search = req.query.search
        let api_url = naver.book_url
        api_url += '?query=' + encodeURI(search)
        
        request.get(reqOptions(api_url), (err,response,body) => {
           
            if(err){
                console.log(err)
                res.send(response.statusMessage)

            }else if(response.statusCode == 200){
                var naverJson = JSON.parse(body).items

                naverJson.forEach(element => {
                    element.search = search
                })
                //res.json(naverJson)

                bookVO.find({search : search}, (err, data) => {
                    var dataLength = Object.keys(data).length
                    // DB에 데이터가 있으면 => DB에 있는 데이터로 조회 수행
                    if(dataLength > 0){
                        // res.json(books)
                        res.render('book/list', {books:data})
                    // DB에 데이터가 없으면 => 네이버 검색 API로 조회 후 DB에 insert 수행    
                    }else{
                        bookVO.collection.insertMany(naverJson, (err,result) => {
                            console.log(err)
                            console.log(result)

                            if(err){
                                res.send("DATA_BULKINSERT_FAILED")
                            }else{
                                // res.json(naverJson)
                                res.render('book/list', {books:naverJson})
                            }
                        })
                    }
                })
                
            }else{
                res.send("unKnown Error response")
            }
        })
    })

    return router
}

