import React from "react";
import "./TodoForm.css";

const TodoForm = ({ value, onCreate, onChange, onKeyPress }) => {
  return (
    <div className="form">
      <input
        onChange={onChange}
        value={value}
        placeholder="오늘의 할일을 적어주세요"
        onKeyPress={onKeyPress}
      />
      <div className="todo-insert" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

export default TodoForm;
