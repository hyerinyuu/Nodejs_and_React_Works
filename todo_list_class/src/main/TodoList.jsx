import React, { Component } from "react";
import TodoItem from "./TodoItem";

/*
    [LifeCycle method]
    code snippet이 생성하는 method는 v16.3이전에 주로 사용하던 method이고
    16.3 이후에는 일부 method에 성능상의 이슈가 발생가능한 소지가 발견되어 소멸되거나
    다른 method로 대치하기로 결정되었다.

   처음 component를 생성하고 start를 했을 때 수행 순서
   
   1. constructor() 가 실행
   2. componentWillMount()
   3. render()
   4. componentDidMount
*/
class TodoList extends Component {
  // constructor(props) {
  //   super(props);
  // }

  /*
    화면에 리스트를 표시하기 위한 todoList 배열이
    변경되었느냐를 판단해서
    render() 함수를 호출할지 안할지를 알려주는 method

    js에서 객체(배열) == 객체(배열) 비교를 할 경우
    간혹 비슷한 주소 위치를 참조하여 서로 내용이 다름에도 같은 배열로 나타나는 경우가 있다.
    따라서 js에서 객체를 비교할 때는
    객체(배열) === 객체(배열) 처럼 비교를 하여 
  */
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todoList !== nextProps.todoList;

    // return값이 false이면 render를 하지 않음
    return true;
  }

  render() {
    // 3. 부모component(TodoMain.jsx)에서 전달받은 데이터를 분해하기
    const { todoList, onToggle, onDelete } = this.props;
    const todoMaps = todoList.map(({ id, text, checked }) => (
      // map은 key값으로 update가 되었는지를 감시하기 때문에
      // 항상 key값을 unique로 넣어줘야 오류가 나지 않는다.
      <TodoItem
        id={id}
        text={text}
        checked={checked}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ));

    return <div>{todoMaps}</div>;
  }

  // v17 이후에서는 사용 불가 상태
  // componentWillMount() {}

  // v17 이후에서는 사용 불가 상태
  // componentDidMount() {}

  // v17 이후에서는 사용 불가 상태
  // getDerivedStateFromProps()으로 변경
  // componentWillReceiveProps(nextProps) {}

  // v17 이후에서는 사용 불가 상태
  // getSnapshotBeforeUpdate()으로 변경
  // componentWillUpdate(nextProps, nextState) {}

  // v17 이후에서는 사용 불가 상태
  // componentDidUpdate(prevProps, prevState) {}

  // componentWillUnmount() {}
}

export default TodoList;
