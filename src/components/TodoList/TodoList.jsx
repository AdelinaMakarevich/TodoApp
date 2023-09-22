import React from 'react'
import PropTypes from 'prop-types'

import './TodoList.scss'

import TodoListItem from '../TodoListItem'

const TodoList = ({ todos, onDone, onDeleted, onEdition, timerComplited, onAddition }) => {
  const element = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <li key={id}>
        <TodoListItem
          todos={{ ...itemProps }}
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

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDone: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  timerComplited: PropTypes.func.isRequired,
  onAddition: PropTypes.func.isRequired,
}

export default TodoList
