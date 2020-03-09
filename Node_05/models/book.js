var mong = require("mongoose")
var bookModel = mong.Schema({
    bTitle : String,
    bWriter : String,
    bComp : String,
    bPrice : Number
    
})
// mong으로 설정된 변수들을 book이라는 이름의 table로 생성하라
// 이때 model에 설정하는 document이름은 반드시 단수로 지정하는 것이 좋다.
// 실제 db에는 document이름이 복수로 자동변경되어 저장되기 때문
module.exports = mong.model("book2", bookModel)