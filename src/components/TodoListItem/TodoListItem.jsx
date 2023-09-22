import React from 'react'
import PropTypes from 'prop-types'

import Timer from '../Timer/Timer'

import './TodoListItem.scss'

const TodoListItem = ({ todos, onDone, onDeleted, timerComplited, onAddition }) => {
  let classNames = 'Description'
  if (todos.done) {
    classNames += ' Done'
  }
  const editPanel = (event) => {
    event.target.defaultValue = todos.label
    if (event.keyCode == 13 && event.target.value != 0 && event.target.value != /^\s+$/) {
      onAddition(event.target.value, todos.timer.min, todos.timer.sec, todos.id)
      event.target.classList.toggle('View')
    }
  }

  const activeEdit = (event) => {
    if (!todos.done) {
      event.target.parentElement.classList.toggle('View')
      event.target.parentElement.parentElement.querySelector('div').classList.toggle('View')
    }
  }

  return (
    <div className="TodoListItem">
      <div className="Editing View">
        <input type="text" className="Edit" onKeyUp={editPanel} />
      </div>
      <div>
        <input onClick={onDone} className="Toggle" type="checkbox" />
        <label>
          <span
            className={classNames}
            onClick={(event) => event.currentTarget.parentElement.parentElement.querySelector('.Toggle').click()}
          >
            {todos.label}
          </span>
          <Timer todos={{ ...todos }} timerComplited={timerComplited} />
        </label>
        <button type="button" className="Icon IconEdit" onClick={activeEdit}></button>
        <button type="button" className="Icon IconDestroy" onClick={onDeleted}></button>
      </div>
    </div>
  )
}

TodoListItem.propTypes = {
  todos: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  timerComplited: PropTypes.func.isRequired,
  onAddition: PropTypes.func.isRequired,
}

export default TodoListItem
