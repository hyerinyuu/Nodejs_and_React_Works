var mongoose = require("mongoose")

var bookVO = mongoose.Schema({
    bTitle : String,
    bWriter : String,
    bComp : String,
    bPrice : Number
})

// 실제 테이블 명은 tbl_books로 생성됨
module.exports = mongoose.model("tbl_book", bookVO)