import React, { Component } from "react";

// 임의로 작성된 component 파일( *.jsx, *.js)을 사용하기 위해서
// 먼저 import를 수행한다.

// main폴더에 있는 TodoMain.jsx 파일을 TodoMain이라는 이름으로 사용하겠다는 선언

// 이렇게 선언을 하면 render() 함수 내에서 일반 tag와 같은 방식으로 사용할 수 있다.
import TodoMain from "./main/TodoMain";

/*
        [class type component]
  class 키워드로 시작되고 반드시 Component를 extends(상속)하여 준비
*/
class App extends Component {
  id = 5;
  // 1. state 키워드를 사용해 변수 선언
  state = {
    input: "",
    todoList: [
      { id: 0, text: "오늘 마감할 일", checked: true },
      { id: 1, text: "공모전 서류 제출", checked: true },
      { id: 2, text: "react form 작성", checked: false },
      { id: 3, text: "spring security", checked: false },
      { id: 4, text: "Naver RestTemplate", checked: true }
    ]
  };

  handleCreate = () => {
    // **************************************
    //              [this scope change issue]
    // 화살표함수의 this == app.js
    // 만약 handleCreate = function(){}와같은 전통적인 script함수를 사용하면
    // this == handleCreate가 되어 이 함수는 정상작동하지 않게 된다.(state가 정의되지 않아서)
    // **************************************
    const { input, todoList } = this.state;
    this.setState({
      input: "",
      // concat : 기존 객체(JSON) 배열에 새로운 객체(JSON)을 추가하는 함수
      todoList: todoList.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  };

  handleToggle = id => {
    // ====================여기서부터

    // this : 화살표 함수로 되어있는 이벤트 핸들러는
    // this가 바로 현재 component다
    // this == App.js의 context(문맥, thread의 모든 정보를 담고 있는 것)
    const { todoList } = this.state;

    // id 매개변수에 담겨있는 값이 객체 배열의 몇번째 위치값이냐?
    const index = todoList.findIndex(todo => todo.id === id);

    // 인덱스에 해당하는 요소를 추출
    const selectTodo = todoList[index];

    // 기존 todoList의 checked값을 변경하는 코드(복사x)
    /*
      this.setStatus({
        checked: !selectTodo.checked
      })
    */

    // 기존의 todoList를 nextTodoList에 복사해두기
    const nextTodoList = [...todoList];

    // 기존의 checked값이 true -> false, false -> true로 반전
    nextTodoList[index] = {
      ...selectTodo,
      checked: !selectTodo.checked
    };

    // ==================여기까지가 1개 아이템의 checked값을 변경시키는 코드

    // 여기에오면 비로소 render()를 호출해서 변경된 아이템으로 덮어씀
    this.setState({
      todoList: nextTodoList
    });
  };

  /*
      TodoForm input box에 value={input} 과 같은 형태가 되고
      {input}은 props 상태로 component에 전달되어 readOnly상태가 된다.
      그래서 input box에 onChange 이벤트를 설정하여
      키보드에서 입력된 글자를 변수{input}에 강제로 붙여주는 일을 수행하는
      onChange method를 수행해야한다.

      e.target.value : 키보드 입력을 캡쳐하는 키보드 이벤트 메시지
  */
  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  // Enter를 눌렀을때 자동으로 추가 버튼이 클릭되도록 만듦
  handleKeyPress = e => {
    // == : equal 연산자, equal연산을 할 때 자동으로 형변환을 수행
    //    어떤경우에는 전혀 예상치 못한 true가 나오기도 한다.
    // === : identity 연산자, 객체 혹은 배열등을 eq연산을 하거나
    //      형변환이 되면 안되는 부분들에서 사용.
    // is 연산자와 비슷한 기능
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  // 현재 클릭된(id가 선택된) 아이템만 남기고
  // 나머지 리스트만 추출하기
  handleDelete = id => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter(todo => todo.id !== id)
    });
  };

  // react lifeCycle중에 작동되는 method
  // 최초에 어플이 실행되면 한번 작동이 되고
  // 데이터나 화면 디자인이 변경되면 호출되는 method
  render() {
    // 2. 자식 component에 데이터를 전달하기 위해서
    // state로 선언된 input과 todoList들을 props로 변환하기
    const { input, todoList } = this.state;

    // 현재 클래스에서 만든 method를 통째로
    // 자식 component에 전달 하기 위해서 props로 생성
    // const {} ==> props로 변경하라
    const {
      handleCreate,
      handleChange,
      handleKeyPress,
      handleToggle,
      handleDelete
    } = this;
    return (
      <div>
        <TodoMain
          input={input}
          todoList={todoList}
          onCreate={handleCreate}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    );
  }
}

export default App;
