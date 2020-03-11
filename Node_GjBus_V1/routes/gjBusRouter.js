var express = require('express')
var router = express.Router()

// app.js에 download한 request middle ware
var request = require('request')
var gjStation = require("../models/gjbusStation")

// router를 선언하는 곳(app.js)에서 매개변수로 config값을 전달하기 위해서 
// module.exports를 이전과 다른 방법으로 선언.
module.exports = function(app,config){

    router.get("/bustime", function(req,res){
        let busstop_id = req.query.id
        let url = config.gjbus.arrive_url
        let apiKey = config.gjbus.apiKey

        apikey = encodeURIComponent(apiKey)
        let queryParams = "?"
        queryParams += encodeURIComponent("ServiceKey") + "=" + apiKey
        queryParams += "&"
        queryParams += encodeURIComponent("BUSSTOP_ID") + "=" 
                    + encodeURIComponent(busstop_id)
        
        request({
            url : url + queryParams,
            method : 'GET'
        }, function(err,response,body){
            console.log(err)
            var stop_info = JSON.parse(body)
            if(stop_info.RESULT.RESULT_CODE == 'ERROR'){
                res.send('도착정보 없음')
            }else{
                res.render("gjbus/bustime", {bustimes:stop_info.BUSSTOP_LIST})
            }
                
        })                    
    })

    /*
        mongoose 문자열 검색
        {칼럼명 : 값} : 완전히 일치하는 문자열만 검색
        {칼럼명 : RegExp} : javascript의 RagExp 함수를 이용하여 정규식으로 검색
        ==> {칼럼명 : RegExp('^' + 값 )} : 시작문자열검사(==SQL 값%)
            {칼럼명 : RegExp(값 , 'ig')} : 중간문자열 검사(==SQL %값%)
    */
    router.get("/searchStation", function(req,res){
        let station = req.query.station
        gjStation.find({BUSSTOP_NAME : RegExp(station, 'ig')})
        .sort({BUSSTOP_NAME : 'asc'})
        .exec(function(err,stations){
        res.render('gjbus/station_small', {stations:stations})
        })
    })

    router.get('/viewStation', function(req,res){
        gjStation.find({}).skip(100).limit(100).sort({BUSSTOP_NAME:'asc'}).exec(function(err,stations){
            res.render("gjbus/station", {stations:stations})
        })
    })

    router.get('/getStation', function(req,res){
        
        // config의 dataGoKr.json에서 설정한 변수들
        var url = config.gjbus.station_url
        var apiKey = config.gjbus.apiKey
        apiKey = encodeURIComponent(apiKey)

        var queryParams = '?'
        queryParams += encodeURIComponent('ServiceKey') + "=" + apiKey

        request({
            url : url + queryParams,
            method : 'GET'
            // err, response, body : 공공db가 우리에게 주는 정보들이 담길 매개변수
        }, function(err,response,body){

            // 공공db에서 온 데이터는 json형태지만 전부 문자열이라서
            // json문자열 형태로 수신된 body에 담긴 데이터를 json Object로 변환
            var resultJson = JSON.parse(body)

            // 공공 DB가 주는 데이터를 보면
            // RESULT안에 RESULT_CODE와 RESULT_MSG가 있는데 이를 활용해서
            // 데이터를 정상수신했을때만 json형태로 뿌려주고
            // 실패하면 오류메시지를 보여주고 데이터수신오류라고 화면에 표시
            if(resultJson.RESULT.RESULT_CODE == 'SUCCESS'){
                
                // 데이터가 정상 수신
                // 만약 기존 데이터가 있으면 모두 삭제하고
                // 새로운 데이터로 대체
                gjStation.deleteMany(function(){
                    var station_list = resultJson.STATION_LIST

                    gjStation.collection.insertMany(station_list, function(err, result){
                        if(err){
                            res.send('DATA_BULK_INSERT_ERROR')
                        }else{
                            // res.json(result)
                            res.render('gjbus/station', {stations:result.ops})
                        }
                        
                    })

                    // station_list.forEach(function(station){
                        
                    //     var vo = new gjStation(station)
                    //     vo.save(function(err,data){
                    //         res.json(data)
                    //     })
                    // })
                })

                // res.json(resultJson)    
            }else{
                res.write(resultJson.RESULT.RESULT_MSG)
                res.end('데이터 수신 오류')
            }
            
        })
    })
    return router
}