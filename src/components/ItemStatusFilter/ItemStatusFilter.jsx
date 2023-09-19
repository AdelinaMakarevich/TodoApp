import React from 'react'

import './ItemStatusFilter.scss'

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
    const button = [
      { name: 'All', id: 1 },
      { name: 'Active', id: 2 },
      { name: 'Completed', id: 3 },
    ]
    return (
      <footer className="Footer">
        <span className="TodoCount">
          tasks not completed:{' '}
          {this.props.todos.reduce((accumulator, currentValue) => {
            if (currentValue.done == false) {
              return accumulator + 1
            } else return accumulator
          }, 0)}
        </span>
        <ul className="Filters">
          {button.map((item) => {
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    this.filter(item.name)
                  }}
                >
                  {item.name}
                </button>
              </li>
            )
          })}
        </ul>
        <button type="button" className="ClearCompleted" onClick={this.delete}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default ItemStatusFilter
