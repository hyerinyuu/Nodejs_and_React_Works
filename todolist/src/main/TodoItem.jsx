import React from "react";
import "./TodoItem.css";

/*
    className={`todo-text ${checked && 'checked'}`}
    => checked 변수가 true일때만 
    className="todo-text checked" 라고 붙이고
    false이면 className="todo-text"만 붙여라
*/
const TodoItem = ({ text, checked }) => {
  return (
    <div className="todo-item">
      <div className="delete-item">&times;</div>
      <div className={`todo-text ${checked && "checked"}`}>
        <div>{text}</div>
      </div>
      {checked && <div className="check-mark">&#x2713;</div>}
    </div>
  );
};

export default TodoItem;
