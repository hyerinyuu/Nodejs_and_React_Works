import React, { Component } from "react";
import "./TodoItem.css";

class TodoItem extends Component {
  // checked값이 바뀌지 않았을때는 rendering하지 마라
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }
  render() {
    const { id, text, checked, onToggle, onDelete } = this.props;
    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div
          className="delete-item"
          onClick={e => {
            // onDelete는 onToggle이 감싸고 있기 때문에 이벤트를 더이상 전파시키지 않기 위해
            // stopPropagation을 사용
            e.stopPropagation();
            onDelete(id);
          }}
        >
          &times;
        </div>
        <div className={`todo-text ${checked ? "checked" : ""}`}>{text}</div>
        {checked && <div className="check-mark">&#x2713;</div>}
      </div>
    );
  }
}

export default TodoItem;
