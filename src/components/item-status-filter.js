import React from 'react'

import './item-status-filter.css'

class ItemStatusFilter extends React.Component {
  constructor() {
    super()
    this.filter = (value) => {
      this.props.dataFilter(value)
    }
    this.delete = () => {
      this.props.onDeleted('done')
    }
  }
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          tasks not completed:{' '}
          {this.props.todos.reduce((accumulator, currentValue) => {
            if (currentValue.done == false) {
              return accumulator + 1
            } else return accumulator
          }, 0)}
        </span>
        <ul className="filters">
          <li>
            <button type="button" onClick={() => this.filter('all')}>
              All
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.filter('active')}>
              Active
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.filter('completed')}>
              Completed
            </button>
          </li>
        </ul>
        <button className="clear-completed" onClick={() => this.delete()}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default ItemStatusFilter
