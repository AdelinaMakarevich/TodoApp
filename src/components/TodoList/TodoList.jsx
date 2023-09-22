import React from 'react'

import './TodoList.scss'

import TodoListItem from '../TodoListItem'

const TodoList = ({ todos, onDone, onDeleted, onEdition, timerComplited, onAddition }) => {
  const element = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <li key={id}>
        <TodoListItem
          {...itemProps}
          onDeleted={(event) => onDeleted(id, event)}
          onDone={() => onDone(id)}
          onEdition={(target) => onEdition(id, target)}
          timerComplited={() => timerComplited(id)}
          onAddition={onAddition}
        />
      </li>
    )
  })
  return <ul className="TodoList">{element}</ul>
}

export default TodoList
