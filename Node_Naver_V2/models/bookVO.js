var mongoose = require('mongoose')

var bookVO = mongoose.Schema({
    title : String,         // 책이름
    link : String,          // 검색결과 link
    image : String,         // 썸네일
    author : String,        // 저자
    price : Integer,        // 가격
    publisher : String,     // 출판사
    pubdate : String,     // 출간일
    isbn : Integer,         // isbn
    description : String    // 내용 요약
})

module.exports = mongoose.model('tbl_pjbook', bookVO)
