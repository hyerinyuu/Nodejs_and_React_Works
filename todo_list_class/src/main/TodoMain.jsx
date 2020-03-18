import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "./TodoMain.css";

/*
        [함수형 component]
    화살표함수 형으로 코드가 시작되고
    render()함수 없이 바로 return()
*/
const TodoMain = ({
  input,
  todoList,
  onCreate,
  onChange,
  onKeyPress,
  onToggle,
  onDelete
}) => {
  return (
    <main className="todoTemplate">
      <div className="title">할일 리스트</div>
      <div className="form-Controller">
        <TodoForm
          value={input}
          onCreate={onCreate}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
      <div className="todolist-controller">
        <TodoList todoList={todoList} onToggle={onToggle} onDelete={onDelete} />
      </div>
    </main>
  );
};

export default TodoMain;
