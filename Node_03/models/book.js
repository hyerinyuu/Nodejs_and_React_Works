/*
    [js의 변수 선언자]
   var : 전역변수, 현재 모듈(*.js)어디에서나 값을 읽고 쓸 수 있는 선언
   const : 상수, 현재 모듈 어디에서나 값을 읽을 수 있고
           최초 한번만 값을 할당할 수 있음 java의 final과 비슷
   let : 지역변수, 현재 함수 내에서만 값을 읽고 쓸 수 있으며
         함수를 벗어나면 변수가 해제된다.
*/
var mong = require("mongoose")
var bookModel = mong.Schema({
    BName : {
        type : String,
        required : true, // not null
        unique : true, // primary key
        trim : true // 문자열에 빈칸 있으면 삭제
    },
    BComp : String,
    BWriter : String,
    BPrice : Number,
    BYear : {
        type : String,
        lowercase : true // 모든 값을 소문자로 표신 
    }
})

/*
    model()에 설정하는 document(book)이름을 
    반드시 단수로 지정하는 것이 좋다.

    실제 db에 저장될때는
    document이름이 복수로 변경되어서 저장.
    ex) db.books.find({})
*/
// mong으로 설정된 부분을 book이라는 이름의 table로 생성하라
module.exports = mong.model("book", bookModel)