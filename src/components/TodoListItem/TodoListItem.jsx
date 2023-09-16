import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../Timer/Timer'

import './TodoListItem.scss'

class TodoListItem extends React.Component {
  constructor() {
    super()
    this.onLabelClick = () => {
      this.props.onDone()
    }
    this.itemCheck = (event) => {
      this.props.onEdition(event.target.closest('div'))
    }
    this.timeCounter = () => {
      return formatDistanceToNow(this.props.date, { addSuffix: true })
    }
  }
  render() {
    const { label, done, onDeleted, timerComplited } = this.props

    let classNames = 'Description'
    if (done) {
      classNames += ' Done'
    }

    return (
      <div className="TodoListItem">
        <input onClick={this.onLabelClick} className="Toggle" type="checkbox" />
        <label>
          <span
            className={classNames}
            onClick={(event) => event.currentTarget.parentElement.parentElement.querySelector('.Toggle').click()}
          >
            {label}
          </span>
          <Timer todo={this.props} timerComplited={timerComplited} />
        </label>
        <button type="button" className="Icon IconEdit" onClick={this.itemCheck}></button>
        <button type="button" className="Icon IconDestroy" onClick={onDeleted}></button>
      </div>
    )
  }
}

export default TodoListItem
