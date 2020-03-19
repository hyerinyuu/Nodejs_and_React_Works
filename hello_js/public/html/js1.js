// terminal에서 node_works\hello_js\public\html로 cd한 후
// node (파일명.확장자) 를 입력하면 terminal에서 실행가능
console.log("나는 자바 스크립트 입니다.");

// json type의 객체를 선언
var std = { name: "홍길동", age: 30, tel: "1234" };

// 숫자형 배열을 선언
var arrNumber = [1, 2, 3, 4, 5];
var arrString = ["홍길동", "이몽룡", "성춘향", "장보고", "이순신"];

// console.log(값, 값, 값) : 각각의 값들을 형변환 하지 말고 잇는 그대로 console에 출력하라
// console.log(값 + 값)을 하니 object, Object라는 값이 나옴
console.log("객체 : ", std);
console.log("숫자형 :", arrNumber);
console.log("문자열형 : ", arrString);

// 객체요소중 일부를 변경하고자 할 때
var std = { ...std, age: 100 };
console.log("객체 std : ", std); // std객체의 age값이 100으로 변경되어 출력
// == var ste = {name:std.name, age:std.age, age:std.tel }과 같은 코드임

// var키워드는 위에서 선언이 되어도 다시 같은 이름으로 선언해도 오류가 나지 않음
// const로 선언한 변수는 밑에서 같은 이름으로 다시 선언하면 오류
// const ==> 상수 let ==> 변동되는 변수  const와 let는 중복선언 x

var sum = 0;
var num = 0;

// forEach문은 배열을 한개씩 순회하면서
// 요소들을 callback 함수에 전달하며 코드를 수행한다.
// 이 forEach를 이용하여 요소를 연산한 후 forEach가 끝난 후 값을 조회하면
// forEach의 순회에서 계산된 결과가 정확히 조회된다는 보장이 없다.
// 왜냐하면 forEach는 비동기방식이기 때문이다.
arrNumber.forEach(function(item, index, originalArray) {
  sum += item; // 1번 코드
  sum += originalArray[index]; // 1번코드와 같은연산을 수행하는 코드
});
arrNumber.forEach(item => {});

// 배열순회후에 연산결과를 보장받으려면
// 전통 for문을 사용해야한다.
for (let i = 0; i < arrNumber.length; i++) {
  sum += arrNumber[i];
}
console.log("합계=", sum);

//              [map]
// 배열을 순회하면서 각 요소를 callback함수에 전달하고
// **** callback함수가 return하는 값들을 모아서 다른 배열로 생성해준다. ****
// arrNumber의 값들을 순회하며 그 값들을 num에 저장하고 그 값들을 모두 모아 저장해서
// 그 값들을 arrNumber2에 통채로 저장한다.
const arrNumber2 = arrNumber.map(num => {
  return num;
});

console.log("원래 배열 : ", arrNumber);
console.log("map 배열 : ", arrNumber2);

var arrString = ["홍길동", "이몽룡", "성춘향", "장보고", "이순신", "성춘향"];

// find는 배열요소중 값 찾기
// arrString의 값을 뽑아서 item에 넘기고 item을 callback함수로 넘겨서 연산을 수행한 후
// 그 값을 return하라
// 화살표 함수에서 다른 코드없이 return문 한줄만 있을 경우
// 함수 몸체의 {}를 생략하고 return 키워드를 사용하지 않는다.
// 화살표함수의 매개변수가 1개만 있을때는 ()없이 사용
//      매개변수가 1개도 없을때는 빈(blank) 괄호만 "반드시 사용"
//      매개변수가 2개 이상일때는 필수적으로 괄호로 묶는다.
// find : 일치하는 값을 찾을때(중복값이 있으면 한개만 나옴)
const arrString2 = arrString.find(item => item === "성춘향");

// 찾는 아이템이 몇번째 요소에서 처음 나타나나?
const index = arrString.findIndex(item => item === "성춘향");

console.log("성춘향 : ", arrString2);
console.log("findIndex값 : ", index);

//
const arrString3 = arrString.find(item => {
  return item === "장영실";
});
console.log("장영실", arrString3);

const arrNumber3 = [48, 67, 83, 748, 738, 748, 7, 74, 4, 8, 4, 87, 5, 1, 7, 6];
// filer :  원하는 답변만 뽑아 낼때(중복값도 다 나옴)
const evenNumber = arrNumber3.filter(item => {
  return item % 2 === 0;
});
console.log("arrNumber2배열의 짝수 : ", evenNumber);

// reduce() : acc = 0으로 시작을 하고
//      arrNumber4의 각 요소를 item에 보내고 내부에서 코드를 실행한 후 결과값 return
// acc = 0+1, acc(=0+1) = (0+1)+2 ...
// forEach의 단점(forEach수행이 끝난 후 연산결과를 조회했을 때
// 연산결과의 정확도를 보장할 수 없는 문제)을 해결한 함수
const arrNumber4 = [1, 2, 3, 4, 5];
const reduce = arrNumber4.reduce((acc, item) => {
  return acc + item;
});
console.log("reduce : ", arrNumber4, reduce);

// sort : 1차원 배열일 경우에 배열을 정렬하는 함수
const sortString = arrString.sort();
console.log("sort 정렬 : ", sortString);

// callback함수를 사용해서 역순(-1) 정렬
// callback함수에서 결과 조건을 연산한 후
// -1이나 1을 return하면 asc, desc를 변환할 수 있다.
const sortString2 = arrString.sort((item1, item2) => {
  if (item1 > item2) return -1;
});
console.log("역순정렬 : ", sortString2);

const mask = [
  { name: "가든약국", state: "P" },
  { name: "뒷집약국", state: "E" },
  { name: "앞집약국", state: "E" },
  { name: "푸른약국", state: "S" },
  { name: "중흥약국", state: "E" },
  { name: "용봉약국", state: "P" },
  { name: "전대약국", state: "E" },
  { name: "조대약국", state: "P" },
  { name: "충장약국", state: "E" }
];

const p_mask = mask.filter(item => item.state === "P");
console.log("p_mask : ", p_mask);

const e_mask = mask.filter(item => {
  return item.state === "E";
});
console.log("e_mask : ", e_mask);

const p_sort_mask = p_mask.sort((item1, item2) => {
  if (item1.name > item2.name) return 1;
});
console.log("p_sort_mask : ", p_sort_mask);

const e_sort_mask = e_mask.sort((item1, item2) => {
  if (item1.name > item2.name) return 1;
});
console.log("e_sort_mask : ", e_sort_mask);
