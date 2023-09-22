import React from 'react'
import PropTypes from 'prop-types'

import './ItemStatusFilter.scss'

const ItemStatusFilter = ({ todos, dataFilter, allDelete }) => {
  const filter = (value) => {
    dataFilter(value)
  }
  const deleted = () => {
    allDelete()
  }
  const button = [
    { name: 'All', id: 1 },
    { name: 'Active', id: 2 },
    { name: 'Completed', id: 3 },
  ]
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
        {button.map((item) => {
          return (
            <li key={item.id}>
              <button
                onClick={() => {
                  filter(item.name)
                }}
              >
                {item.name}
              </button>
            </li>
          )
        })}
      </ul>
      <button type="button" className="ClearCompleted" onClick={deleted}>
        Clear completed
      </button>
    </footer>
  )
}

ItemStatusFilter.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataFilter: PropTypes.func.isRequired,
  allDelete: PropTypes.func.isRequired,
}

export default ItemStatusFilter
