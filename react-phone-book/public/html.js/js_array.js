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
