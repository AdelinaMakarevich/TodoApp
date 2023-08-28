import React from 'react'
import { createRoot } from 'react-dom/client'

import SearchPanel from './components/search-panel'
import TodoList from './components/todo-list'
import ItemStatusFilter from './components/item-status-filter'

import './index.css'

export default class App extends React.Component {
  constructor() {
    super()
    this.filterTodos = (value) => {
      let items = [...document.querySelectorAll('.todo-list-item')]

      switch (value) {
        case 'all':
          items.forEach((todo) => {
            todo.style.display = ''
          })
          break

        case 'active':
          items.forEach((todo) => (todo.style.display = ''))
          items
            .filter((todo) => todo.querySelector('.description').classList == 'description done')
            .forEach((todo) => (todo.style.display = 'none'))
          break

        case 'completed':
          items.forEach((todo) => (todo.style.display = ''))
          items
            .filter((todo) => todo.querySelector('.description').classList == 'description')
            .forEach((todo) => (todo.style.display = 'none'))
          break
      }
    }
    this.state = {
      todoData: [
        {
          label: 'задача 1',
          done: false,
          id: 1,
          date: new Date(2023, 0, 1, 0, 0, 15),
        },
        {
          label: 'задача 2',
          done: false,
          id: 2,
          date: new Date(2023, 5, 1, 0, 0, 15),
        },
        {
          label: 'задача 3',
          done: false,
          id: 3,
          date: new Date(2023, 7, 26, 19, 59, 15),
        },
      ],
    }
    this.newTask = (value) => {
      this.setState(({ todoData }) => {
        let id = todoData.at(-1).id + 1
        let now = new Date()
        let task = {
          label: value,
          done: false,
          id: id,
          date: now,
        }
        let newTodoData = [...todoData, task]
        return { todoData: newTodoData }
      })
    }

    this.doneTask = (id) => {
      this.setState(({ todoData }) => {
        let index = todoData.findIndex((e) => e.id === id)
        let deal = todoData[index]
        deal.done = !deal.done
        let newTodoData = [...todoData.slice(0, index), deal, ...todoData.slice(index + 1)]
        return { todoData: newTodoData }
      })
    }

    this.deletedItem = (id) => {
      if (id === 'done') {
        this.setState(({ todoData }) => {
          const newTodoData = todoData.filter((data) => !data.done)

          return {
            todoData: newTodoData,
          }
        })
      } else {
        this.setState(({ todoData }) => {
          const index = todoData.findIndex((e) => e.id === id)
          let newTodoData = [...todoData.slice(0, index), ...todoData.slice(index + 1)]

          return {
            todoData: newTodoData,
          }
        })
      }
    }

    this.editItemPanel = (value) => {
      let input = document.createElement('input')
      input.value = value.querySelector('.description').textContent
      input.className = 'edit'
      input.onkeyup = function (event) {
        if (event.keyCode == 13) {
          value.querySelector('.description').textContent = input.value
          input.remove()
          value.classList.toggle('view')
        }
      }
      value.after(input)
      value.classList.toggle('view')
    }
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <SearchPanel onAddition={this.newTask} />
        </header>
        <section className="main">
          <TodoList
            todos={this.state.todoData}
            onDone={this.doneTask}
            onDeleted={this.deletedItem}
            onEdition={this.editItemPanel}
          />
        </section>
        <ItemStatusFilter todos={this.state.todoData} dataFilter={this.filterTodos} onDeleted={this.deletedItem} />
      </section>
    )
  }
}

createRoot(document.getElementById('root')).render(<App />)
