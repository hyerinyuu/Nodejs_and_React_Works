const path = reauire('path')

/*
    현재 작동되는 환경을 developement환경으로 설정하고
    그에 맞는 DB정보를 설정하기 위함
*/
const env = process.env.NODE_ENV || 'development'
const configPath  = path.join(__dirname, "..", "config", "config.json")

// const c1 = require(configPath)
// const c2 = c1[env]

const config = require(configPath)[env]
const Sequelize = require('sequelize')
let sequelize = new Sequelize(config.database, config.username, config.password, config)

var database = {}

// db 설정값이 추가된 sequelize 객체
database.sequelize = sequelize

// Sequelize class를 static을 사용하기 위한 설정
database.DataTypes = Sequelize

//sequelize 객체와 Sequelize class를 static으로 매개변수로 전달
database.bbsVO = require("./bbsVO")(sequelize, Sequelize)

module.exports = database