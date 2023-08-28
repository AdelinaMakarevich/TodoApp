import React from 'react';

import './todo-list.css';

import TodoListItem from './todo-list-item';

const TodoList = ({ todos, onDone, onDeleted, onEdition }) => {
  const element = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id}>
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onDone={() => onDone(id)}
          onEdition={(value) => onEdition(value)}
        />
      </li>
    );
  });
  return <ul className="todo-list">{element}</ul>;
};

export default TodoList;
