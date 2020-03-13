# Image Gallery

## multer 미들웨어를 활용한 이미지 업로드 게시판
## mongoDB와 mongoose를 연동하여 데이터 CRUD 구현

## mongoDB의 용어정리

# db
* RDBMS에서 DB와 같은 역할을 하며, main Schema
* show dbs : db들의 목록을 확인하는 명령
* use mydb : mydb라는 이름의 schema가 없으면 schema를 생성해주고
            이미 schema가 생성되어있으면 사용할 수 있도록 open

# Collection
* RDBMS에서 Table과 같은 역할을 하며, 실제 데이터가 저장되는 작은 공간
* show collection : collection의 목록을 확인, 반드시 use db 실행 후 수행해야한다.
* db.collection.쿼리명령
* db.tbl_books.insert({변수 : 값}) : tbl_books라는 collection을 생성하고
                                    새로운 데이터를 추가하라.
                                    만약 collection이 이미 존재하면 기존 collection에 데이터 추가
* db.collection.drop() : collection을 통채로 삭제

# document
* RDBMS에서 한개의 Record와 같은 역할을 한다.
* db.collection.remove({}) : collection내의 모든 document 삭제
* db.collection.find({}) : 조회 retrieve, read