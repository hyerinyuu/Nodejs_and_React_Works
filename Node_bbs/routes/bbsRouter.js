var express = require("express");
var router = express.Router();
var bbsVO = require("../models/bbsVO");
var moment = require("moment");
var cors = require("cors");

var app = express();

app.use(cors());
// 허용을 원하는 부분만 cors정책을 사용하지 않을 수 있게 option 선언
var corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // IE버전때문에 생기는 문제 제거
};

require("moment-timezone");
moment.tz.setDefault("Asiz/Seoul");

router.get("/", cors(corsOption), (req, res) => {
  /*
    CORS 모듈 없이 CORS 정책을 허용하기 위한 설정
    모든 Router에 공통으로 설정해야함.

  */
  // fetch시에 CORS를 사용하지 않겠음
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-requested-With");

  bbsVO.find({}).exec((err, data) => {
    res.json(data);
  });
});

router.post("/insert", cors(corsOption), (req, res) => {
  req.body.b_date = moment().format("YYYY[-]MM[-]DD");
  req.body.b_time = moment().format("HH:mm:ss");

  var bbs = new bbsVO(req.body);

  bbs.save((err, data) => {
    res.json(data);
  });
});

module.exports = router;
