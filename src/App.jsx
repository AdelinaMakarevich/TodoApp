import React, { useState } from 'react'

import SearchPanel from './components/SearchPanel'
import TodoList from './components/TodoList'
import ItemStatusFilter from './components/ItemStatusFilter'

import './App.scss'

const App = () => {
  const data = [
    {
      label: 'задача 1',
      done: false,
      id: 1,
      date: new Date(2023, 0, 1, 0, 0, 15),
      timer: { min: 0, sec: 40 },
    },
    {
      label: 'задача 2',
      done: false,
      id: 2,
      date: new Date(2023, 5, 1, 0, 0, 15),
      timer: { min: 2, sec: 10 },
    },
    {
      label: 'задача 3',
      done: false,
      id: 3,
      date: new Date(2023, 7, 26, 19, 59, 15),
      timer: { min: 1, sec: 10 },
    },
  ]
  const [todoData, setTodoData] = useState(data)
  const [filter, setFilter] = useState('All')

  const filters = () => {
    switch (filter) {
      case 'All':
        return todoData

      case 'Active':
        return todoData.filter((todo) => {
          return !todo.done
        })
      case 'Completed':
        return todoData.filter((todo) => {
          return todo.done
        })
    }
  }

  const filterTodos = (value) => {
    setFilter(() => value)
  }

  const newTask = (task, min, sec, id = todoData.at(-1).id + 1) => {
    let now = new Date()
    let newTask = {
      label: task,
      done: false,
      id: id,
      date: now,
      timer: { min: min, sec: sec },
    }
    setTodoData((state) => [...state, newTask])
  }

  const doneTask = (id) => {
    let newTodoData = todoData.map((item) => {
      if (item.id == id) {
        item.done = !item.done
      }
      return item
    })
    setTodoData(() => newTodoData)
  }

  const deletedItem = (id) => {
    let newTodoData = todoData.filter((item) => {
      return item.id !== id
    })
    setTodoData(() => newTodoData)
  }

  const allDelete = () => {
    let newTodoData = todoData.filter((item) => {
      return !item.done
    })
    setTodoData(() => newTodoData)
  }

  const timerComplited = (id) => {
    let newTodoData = this.state.todoData.map((item) => {
      if (item.id == id) {
        item.done = !item.done
      }
      return item
    })
    setTodoData(() => newTodoData)
  }

  return (
    <section className="AppTodo">
      <header className="AppHeader">
        <h1>todos</h1>
        <SearchPanel onAddition={newTask} />
      </header>
      <section className="AppMain">
        <TodoList
          todos={filters()}
          onDone={doneTask}
          onDeleted={deletedItem}
          timerComplited={timerComplited}
          onAddition={newTask}
        />
      </section>
      <ItemStatusFilter todos={todoData} dataFilter={filterTodos} onDeleted={deletedItem} allDelete={allDelete} />
    </section>
  )
}

export default App
