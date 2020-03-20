var arr = ["홍길동", "이몽룡", "성춘향", "라푼젤"];
// var hong = arr[0];
// var lee = arr[1];
// var seong = arr[2];
// var rha = arr[3];

const [hong, lee, seong, rha] = arr;
console.log("hone", hong);
console.log("lee", lee);
console.log("seong", seong);
console.log("rha", rha);

const names = { name: "홍기동", phone: "1234", addr: "서울특별시" };
const { name, phone, addr } = names;

// var name = names.name
// const { name, phone, addr } = names;

console.log(name);
console.log(phone);
console.log(addr);

const my = { [name]: "홍길동" }; // name객체의 이름을 홍길동으로 만들어라
console.log(my.홍기동);

// json 객체 선언
const ajson = { aa: "홍길동", bb: "이몽룡" };
console.log("ajson aa값 : ", ajson.aa);
console.log("ajson aa값 : ", ajson.bb);

const { aa } = ajson;
// == const aa = ajson.aa;
// ajson의 aa값을 뽑아서 aa라는 이름의 변수를 생성해라 == 변수 aa ==> '홍길동'
// 이렇게 선언하는것의 장점은 json객체의 값이 아무리 많아도 내가 원하는 값 하나만 알면
// 변수를 길게 늘어뜨리지 않고 쉽게 사용가능함.
// [변수의 분해 할당]
console.log("const aa값 : ", aa); // aa라는 변수에 ajson.aa값만을 복사
