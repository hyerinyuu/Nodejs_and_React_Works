var express = require('express')
var router = express.Router()
var galleryVO = require('../models/galleryVO')

// 파일 경로를 설정할 middleware
var path = require('path')

// 파일(이미지) 업로드를 위해서 multer 설정
var multer = require('multer')

// 파일을 "어디에", "어떻게" 업로드 할 것인가를 설정하는 객체를 만들어야함.
// destination : 어디에 저장할 것인가에 대한 실행코드
// filename : 업로드할때 원본파일이름 -> uploadFileName으로 변경하는 코드가 있고
//           그 코드에서 filename을 생성해준다.(업로드 할 때 변환된 파일 정보)
var saveOptions = multer.diskStorage(
    {
        // destination은 function에 request와 file(파일에 대한 정보), callBack함수(실행할 함수)를 매개변수로 받는다.
        destination : (req,file,callBackFunc) => {
            // 현재 폴더에서 .. : 한단계 위로 올라가서 public 폴더로 가서 uploads 폴더를 찾아라
            // 실제 파일을 저장할 uploadPath 생성(Node_Gallery_V1/public/uploads)
            var uploadPath = path.join(__dirname,"/../", "public", "uploads")
            console.log(uploadPath)
            // 콜백함수에는 첫번째 값을 null, 두번째 값에 uploadPath를 넣어준다.
            callBackFunc(null,uploadPath)
        },
        filename : (req,file,callBackFunc) => {
            
            // 업로드된 파일이름을 변환하여 해킹에 대비해야함(java의 UUID처럼)

            // 날짜시리얼값을 가져와서 _파일 원본이름이랑 붙임
            var uploadFileName = Date.now() + "_" + file.originalname
            callBackFunc(null, uploadFileName)
        }
    }
)

// 실제 파일을 업로드할 함수
// single('') : 우리가 올릴 파일 이름
var saveFile = multer({storage:saveOptions}).single("gOriginalPhotoName")

router.get('/', (req,res) => {
    res.render('index')
})

router.get('/upload', (req,res) => {
    var gallery = new galleryVO()
    res.render('gallery/upload', {gallery:gallery})
})

/*
    file 업로드하기
    1. multer를 사용해서 생성해둔 saveFile(실제 파일업로드를 수행하는 함수)
      함수를 사용해서 파일을 업로드하고
    2. saveFile() callback 함수내에서 변경된 파일 이름을 추출하고
    3. DB에 저장

*/
router.post('/upload', (req, res) => {
    saveFile(req,res,(err)=>{
        if(err){
            console.log(err)
            res.send('FILE UPLOAD FAILED')
        }else{
            // 원래 req.file 객체는
            // web form에서 업로드한 파일에 대한 정보만 담겨있다.
            // 그중 .originalname은 원본파일이름이다.
            let originalname = req.file.originalname

            // 마치 web form에 input tag에 gOriginalPhotoName tag가
            // 원래 있었던 것 처럼 새로운 변수가 추가되고
            // 그곳에 originalname값이 세팅
            req.body.gOriginalPhotoName = originalname

            // 원래 tag에 있던 gUpLoadPhotoName에는 
            // 새로 변경된 파일 이름을 저장해둔다.
            // req.file.filename은 
            // saveOptions에 설정된 filename : 의 값이 세팅되어있다.
            req.body.gUpLoadPhotoName = req.file.filename

            var vo = new galleryVO(req.body)
            vo.save((err,data)=>{
                res.redirect('/gallery')
            })
        }
    })
})


module.exports = router