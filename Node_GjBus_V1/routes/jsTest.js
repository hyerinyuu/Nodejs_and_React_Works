var username = {
    longin:true,
    userid:'korea'
}

// username에 값이 있으면(true)이면 login에 값이 있는지 체크하고,
// 이 값이 있으면(true) name의 userid를 str변수에 담는 코드
var str = username && name.login && name.userid


function userIdCheck(userId) {
    if(!userId){
        userId = 'id없음'
    }
}
// == userId값이 있나 없나 검사할 때
function userIdCheck(userId){
    userId = userId || 'id없음'
}
