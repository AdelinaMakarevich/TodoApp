import React from 'react'

import './ItemStatusFilter.scss'

const ItemStatusFilter = ({ todos, dataFilter, onDeleted }) => {
  const filter = (value) => {
    dataFilter(value)
  }
  const deleted = () => {
    onDeleted('done')
  }

  return (
    <footer className="Footer">
      <span className="TodoCount">
        tasks not completed:{' '}
        {todos.reduce((accumulator, currentValue) => {
          if (currentValue.done == false) {
            return accumulator + 1
          } else return accumulator
        }, 0)}
      </span>
      <ul className="Filters">
        <li>
          <button type="button" onClick={() => filter('all')}>
            All
          </button>
        </li>
        <li>
          <button type="button" onClick={() => filter('active')}>
            Active
          </button>
        </li>
        <li>
          <button type="button" onClick={() => filter('completed')}>
            Completed
          </button>
        </li>
      </ul>
      <button type="button" className="ClearCompleted" onClick={deleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default ItemStatusFilter
