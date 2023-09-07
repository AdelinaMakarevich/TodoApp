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
      return formatDistanceToNow(this.props.date, { addSuffix: true })
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
        <label>
          <span
            className={classNames}
            onClick={(event) => event.currentTarget.parentElement.parentElement.querySelector('.Toggle').click()}
          >
            {label}
          </span>
          <span className="Description">
            <button className="Icon IconPlay"></button>
            <button className="Icon IconPause"></button>
            <p className="Icon Time">hhhh</p>
          </span>
          <span className="Created">created {this.timeCounter()}</span>
        </label>
        <button type="button" className="Icon IconEdit" onClick={this.itemCheck}></button>
        <button type="button" className="Icon IconDestroy" onClick={onDeleted}></button>
      </div>
    )
  }
}

export default TodoListItem
