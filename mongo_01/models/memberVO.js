/*
    mongoDB mongoose를 사용하여 ODM(ORM) 방식으로 사용하기 위해서
    임의로 table 형식의 데이터 구조화를 위한 클래스를 생성
*/
var mongoose = require("mongoose")

// 4개의 속성(필드) 변수를 갖는 memberModel(VO)를 선언
var memberModel = mongoose.Schema({
    strName : String,
    strAddr : String,
    strTel : String,
    intAge : Number
})

// 다른 js파일(클래스 등)에서 사용할 수 있도록 export하기
// 맨 마지막에 export가 있는 js file은 javascript의 class라고 생각하면 됨
module.exports = mongoose.model("member", memberModel)