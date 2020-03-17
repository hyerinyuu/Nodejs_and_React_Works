import React from "react";
import "./TodoMain.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoMain = ({ value }) => {
  return (
    <div>
      <main className="todoTemplate">
        <div className="title">TodoList</div>
        <div className="form-controller">
          <TodoForm value={value} />
        </div>
        <div className="todolist-controller">
          <TodoList />
        </div>
      </main>
    </div>
  );
};

export default TodoMain;
