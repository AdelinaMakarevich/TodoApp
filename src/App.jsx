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

  const filterTodos = (value) => {
    let items = [...document.querySelectorAll('.TodoListItem')]

    switch (value) {
      case 'all':
        items.forEach((todo) => {
          todo.style.display = ''
        })
        break

      case 'active':
        items.forEach((todo) => (todo.style.display = ''))
        items
          .filter((todo) => todo.querySelector('.Description').classList == 'Description Done')
          .forEach((todo) => (todo.style.display = 'none'))
        break

      case 'completed':
        items.forEach((todo) => (todo.style.display = ''))
        items
          .filter((todo) => todo.querySelector('.Description').classList == 'Description')
          .forEach((todo) => (todo.style.display = 'none'))
        break
    }
  }

  const newTask = (task, min, sec) => {
    let id = todoData.at(-1).id + 1
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
    let index = todoData.findIndex((e) => e.id === id)
    let deal = todoData[index]
    deal.done = !deal.done
    let newTodoData = [...todoData.slice(0, index), deal, ...todoData.slice(index + 1)]
    setTodoData(() => newTodoData)
  }

  const deletedItem = (id) => {
    if (id === 'done') {
      const newTodoData = todoData.filter((data) => !data.done)

      setTodoData(() => newTodoData)
    } else {
      const index = todoData.findIndex((e) => e.id === id)
      let newTodoData = [...todoData.slice(0, index), ...todoData.slice(index + 1)]

      setTodoData(() => newTodoData)
    }
  }

  const editItemPanel = (id, target) => {
    const index = todoData.findIndex((e) => e.id === id)
    const edit = todoData[index]
    const input = document.createElement('input')
    input.value = edit.label
    input.className = 'Edit'
    input.onkeyup = function (event) {
      if (event.keyCode == 13 && event.target.value != 0 && event.target.value != /^\s+$/) {
        edit.label = input.value
        edit.date = new Date()
        editItem(index, edit)
        input.remove()
        target.classList.toggle('View')
      }
    }
    target.after(input)
    target.classList.toggle('View')
  }

  const editItem = (index, item) => {
    let newTodoData = [...todoData.slice(0, index), item, ...todoData.slice(index + 1)]

    setTodoData(() => newTodoData)
  }

  const timerComplited = (id) => {
    let index = todoData.findIndex((e) => e.id === id)
    let deal = todoData[index]
    deal.done = !deal.done
    let newTodoData = [...todoData.slice(0, index), deal, ...todoData.slice(index + 1)]
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
          todos={todoData}
          onDone={doneTask}
          onDeleted={deletedItem}
          onEdition={editItemPanel}
          timerComplited={timerComplited}
        />
      </section>
      <ItemStatusFilter todos={todoData} dataFilter={filterTodos} onDeleted={deletedItem} />
    </section>
  )
}

export default App
