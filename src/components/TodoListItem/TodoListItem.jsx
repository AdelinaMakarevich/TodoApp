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
    this.timeCounter = () => {
      return formatDistanceToNow(this.props.date, { addSuffix: true })
    }

    this.editPanel = (event) => {
      event.target.defaultValue = this.props.label
      if (event.keyCode == 13 && event.target.value != 0 && event.target.value != /^\s+$/) {
        this.props.onAddition(event.target.value, this.props.timer.min, this.props.timer.sec, this.props.id)
        event.target.classList.toggle('View')
      }
    }

    this.activeEdit = (event) => {
      if (!this.props.done) {
        event.target.parentElement.classList.toggle('View')
        event.target.parentElement.parentElement.querySelector('div').classList.toggle('View')
      }
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
        <div className="Editing View">
          <input type="text" className="Edit" onKeyUp={this.editPanel} />
        </div>
        <div>
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
          <button type="button" className="Icon IconEdit" onClick={this.activeEdit}></button>
          <button type="button" className="Icon IconDestroy" onClick={onDeleted}></button>
        </div>
      </div>
    )
  }
}

export default TodoListItem
