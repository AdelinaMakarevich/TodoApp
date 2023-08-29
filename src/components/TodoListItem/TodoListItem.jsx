import React from 'react'
import { formatDistanceToNow } from 'date-fns'

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
      return formatDistanceToNow(this.props.date)
    }
  }
  render() {
    const { label, done, onDeleted } = this.props

    let classNames = 'Description'
    if (done) {
      classNames += ' Done'
    }

    return (
      <div className="TodoListItem">
        <input onClick={this.onLabelClick} className="Toggle" type="checkbox" />
        <label onClick={(event) => event.currentTarget.parentElement.querySelector('.Toggle').click()}>
          <span className={classNames}>{label}</span>
          <span className="Created">created {this.timeCounter()} ago</span>
        </label>
        <button type="button" className="Icon IconEdit" onClick={this.itemCheck}></button>
        <button type="button" className="Icon IconDestroy" onClick={onDeleted}></button>
      </div>
    )
  }
}

export default TodoListItem
