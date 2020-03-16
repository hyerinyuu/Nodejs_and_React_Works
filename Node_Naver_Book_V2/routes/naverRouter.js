var naver = require('../config/naver_secret')
var express = require('express')
var router = express.Router()
var request = require('request')
var bookVO = require('../models/naver_book')

var reqOptions = (api_url) => {
    var options = {
        url: api_url,
        headers: {
            'X-Naver-Client-Id': naver.client_id,
            'X-Naver-Client-Secret': naver.client_secret
        }
    }
    return options
}
router.post('/book', (req, res) => {
    /*
        method=GET :
            req.query에 변수가 담겨서 전달
        method=POST : 
            req.body에 변수가 담겨서 전달
    */
    // let searchName = req.query.search
    let searchName = req.body.search
    let api_url = naver.book_url
    api_url += '?query=' + encodeURI(searchName)

    /*
        검색을 실행했을 때
        1. DB에 해당하는 검색어가 저장되어 있는지 찾아보고
        2. 있으면 DB내용을 화면에 보여주고
        3. 만약없으ㅕㅁㄴ naver에서 조회하여 가져오고
        4. DB에 저장하고
        5. 결과를 화면에 보여란

    */
   bookVO.find({search:searchName})
    .exec((err,data)=>{
        if(err){
            res.send(err)
        }else{
            if(data.length > 0){
                res.json(data)
            }else{
                request.get(reqOptions(api_url), (err, response, body) => {
                    // 오류가 없으면 err은 null값이 된다.
                    if (err) {
                        console.log(err)
                        res.send(response.statusMessage)
                    } else if (response.statusCode == 200) {
                        var naverJson = JSON.parse(body).items
                        for(let book of naverJson){
                            // 강제로 key값 넣어주기
                            book.search = searchName
                        }
                        bookVO.collection.insertMany(naverJson,function(err,data){
                            res.json(data)
                        })
                        // res.render('movie/list', { movies: naverJson })
                    } else {
                        res.send("unKnown Error response")
                    }
            
                })
            }
        }
    })
})
module.exports = router