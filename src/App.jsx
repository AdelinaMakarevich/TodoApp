import React, { Component } from 'react'

import SearchPanel from './components/SearchPanel'
import TodoList from './components/TodoList'
import ItemStatusFilter from './components/ItemStatusFilter'

import './App.scss'

class App extends Component {
  constructor() {
    super()
    this.filterTodos = (value) => {
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
    this.state = {
      todoData: [
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
      ],
    }
    this.newTask = (task, min, sec) => {
      this.setState(({ todoData }) => {
        let id = todoData.at(-1).id + 1
        let now = new Date()
        let newTask = {
          label: task,
          done: false,
          id: id,
          date: now,
          timer: { min: min, sec: sec },
        }
        let newTodoData = [...todoData, newTask]
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

    this.editItemPanel = (id, target) => {
      const index = this.state.todoData.findIndex((e) => e.id === id)
      const editItem = this.state.todoData[index]
      const input = document.createElement('input')
      input.value = editItem.label
      input.className = 'Edit'
      let context = this
      input.onkeyup = function (event) {
        if (event.keyCode == 13 && event.target.value != 0 && event.target.value != /^\s+$/) {
          editItem.label = input.value
          editItem.date = new Date()
          context.editItem(index, editItem)
          input.remove()
          target.classList.toggle('View')
        }
      }
      target.after(input)
      target.classList.toggle('View')
    }

    this.editItem = (index, item) => {
      this.setState(({ todoData }) => {
        let newTodoData = [...todoData.slice(0, index), item, ...todoData.slice(index + 1)]

        return {
          todoData: newTodoData,
        }
      })
    }

    this.timerComplited = (id) => {
      this.setState(({ todoData }) => {
        let index = todoData.findIndex((e) => e.id === id)
        let deal = todoData[index]
        deal.done = !deal.done
        let newTodoData = [...todoData.slice(0, index), deal, ...todoData.slice(index + 1)]
        return { todoData: newTodoData }
      })
    }
  }

  render() {
    return (
      <section className="AppTodo">
        <header className="AppHeader">
          <h1>todos</h1>
          <SearchPanel onAddition={this.newTask} />
        </header>
        <section className="AppMain">
          <TodoList
            todos={this.state.todoData}
            onDone={this.doneTask}
            onDeleted={this.deletedItem}
            onEdition={this.editItemPanel}
            timerComplited={this.timerComplited}
          />
        </section>
        <ItemStatusFilter todos={this.state.todoData} dataFilter={this.filterTodos} onDeleted={this.deletedItem} />
      </section>
    )
  }
}

export default App
