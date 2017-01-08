import React from 'react';

const Todo = (props) => {
  const completedClass = props.completed ? ' completed' : '';
  return (
    <div className="todo-container btn-group">
      <button type="button" className={'btn btn-block btn-default text-left' + completedClass} onClick={props.onToggle}>
        {props.text}
      </button>
      <button type="button" className="btn btn-default btn-danger" onClick={props.onDelete}>X</button>
    </div>
  );
}

export default Todo;
