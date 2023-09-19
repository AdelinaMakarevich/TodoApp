import React from 'react'

import './ItemStatusFilter.scss'

const ItemStatusFilter = ({ todos, dataFilter, onDeleted }) => {
  const filter = (value) => {
    dataFilter(value)
  }
  const deleted = () => {
    onDeleted('done')
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

export default ItemStatusFilter
