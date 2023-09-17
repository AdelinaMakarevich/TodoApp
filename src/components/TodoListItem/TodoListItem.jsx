import React from 'react'

import Timer from '../Timer/Timer'

import './TodoListItem.scss'

const TodoListItem = ({ todos, onDone, onDeleted, onEdition, timerComplited }) => {
  let classNames = 'Description'
  if (todos.done) {
    classNames += ' Done'
  }

  return (
    <div className="TodoListItem">
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
      <button
        type="button"
        className="Icon IconEdit"
        onClick={(event) => {
          onEdition(event.target.closest('div'))
        }}
      ></button>
      <button type="button" className="Icon IconDestroy" onClick={onDeleted}></button>
    </div>
  )
}

export default TodoListItem
