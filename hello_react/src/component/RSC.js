import React from "react";
import RSC_SUB from "./RSC_SUB";

/*
         [Component를 만드는 두번째 방법]
    2. 함수형 component 생성
    함수형 컴포넌트는 2014버전에서부터 사용이 가능하다.

    App.js > RCC.jsx, (RCC.js > RCC_SUB.jsx)
    RCC_SUB component에서 name변수에 값을 담아서 전달하기
    <component 변수="값" >
*/
const RSC = () => {
  // == const RSC = funtion() {}
  return (
    <div>
      <div>나는 두번째 함수형 Component</div>
      <RSC_SUB name="홍길동" />
    </div>
  );
};
export default RSC;
