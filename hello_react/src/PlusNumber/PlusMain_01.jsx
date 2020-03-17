import React from "react";

/*
    [함수형 component]
  2014이후 버전에서 도입되었고, 
  React 16.x 이후에서 Hooks라는 개념이 탄생했다.
  장점 : 부모로부터 변수를 전달 받을 때
        함수의 매개변수처럼 받을 수 있다.
  
        [함수에서의 this 키워드]
  일반함수 : this키워드가 함수 자체를 표현하는 객체
  화살표함수 : scope자체가 부모를 가리키는 형태가 되어
            일부 함수내에서 사용할 때 주의를 해야 하는 경우가 많다.
  
  부모로부터 변수를 전달 받을 때
  개별적으로 변수를 받을수도 있고 
  class에서 props에 담겨서 받는 것과 같은 원리로 받을 수 있도록 되었다.
*/
const PlusMain = props => {
  return (
    <div>
      <h1>Counter</h1>
      <h3>{props.name}</h3>
      <button>Plus</button>
      <button>Minus</button>
    </div>
  );
};

export default PlusMain;
