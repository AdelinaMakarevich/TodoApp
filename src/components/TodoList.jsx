import React from 'react'

import './TodoList.scss'

import TodoListItem from './TodoListItem'

const TodoList = ({ todos, onDone, onDeleted, onEdition }) => {
  const element = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <li key={id}>
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onDone={() => onDone(id)}
          onEdition={(value) => onEdition(value)}
        />
      </li>
    )
  })
  return <ul className="todo-list">{element}</ul>
}

export default TodoList
