import React, { Component } from "react";
import "./RCC.css";
import RCC_SUB from "./RCC_SUB";
// ㄴ> 지금부터 이 문서는 React의 Component라는 뜻

/*
        [Component]
    1. 보통 jsx(js) 파일의 형식으로 저장
    2. 가급적 파일의 첫글자, 클래스의 첫글자는 대문자로 해야함
    3. 파일 이름과 클래스 이름을 일치
    4. 모든 따옴표는 큰 따옴표로 통일하는 것이 좋음
    5. 클래스는 1개의 파일에 1개만 작성할 수 있다.
    6. css파일은 따로 만들어 클래스명과 일치시킨다.
    
    
        [Component를 만드는 첫번째 방법]
    1. ES6의 Class문법으로 Component 생성
    혹시 오류가 난다면 extends옆에 React.라고 적어주면 됨(오류안나면 안적어도 됨)
*/
class RCC extends Component {
  render() {
    return (
      <div>
        <div className="myDiv">나는 첫번째 RCC Component</div>
        <RCC_SUB name="홍길동" />
      </div>
    );
  }
}

// 이 component를 외부에서 사용할 수 있도록 선언
// export default는 한 파일에 한개만 있을 수 있다.
export default RCC;
