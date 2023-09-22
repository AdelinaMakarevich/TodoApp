import React, { Component } from 'react'

import SearchPanel from './components/SearchPanel'
import TodoList from './components/TodoList'
import ItemStatusFilter from './components/ItemStatusFilter'

import './App.scss'

class App extends Component {
  constructor() {
    super()
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
      filter: 'All',
    }

    this.filter = () => {
      switch (this.state.filter) {
        case 'All':
          return this.state.todoData

        case 'Active':
          return this.state.todoData.filter((todo) => {
            return !todo.done
          })
        case 'Completed':
          return this.state.todoData.filter((todo) => {
            return todo.done
          })
      }
    }

    this.filterTodos = (value) => {
      this.setState({ filter: value })
    }

    this.newTask = (task, min, sec, id = this.state.todoData.at(-1).id + 1) => {
      this.setState(({ todoData }) => {
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
      let newTodoData = this.state.todoData.map((item) => {
        if (item.id == id) {
          item.done = !item.done
        }
        return item
      })
      this.setState({ todoData: newTodoData })
    }

    this.deletedItem = (id) => {
      let newTodoData = this.state.todoData.filter((item) => {
        return item.id !== id
      })
      this.setState({ todoData: newTodoData })
    }

    this.allDelete = () => {
      let newTodoData = this.state.todoData.filter((item) => {
        return !item.done
      })
      this.setState({ todoData: newTodoData })
    }

    this.timerComplited = (id) => {
      let newTodoData = this.state.todoData.map((item) => {
        if (item.id == id) {
          item.done = !item.done
        }
        return item
      })
      this.setState({ todoData: newTodoData })
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
            todos={this.filter()}
            onDone={this.doneTask}
            onDeleted={this.deletedItem}
            onEdition={this.editItemPanel}
            timerComplited={this.timerComplited}
            onAddition={this.newTask}
          />
        </section>
        <ItemStatusFilter
          todos={this.state.todoData}
          dataFilter={this.filterTodos}
          onDeleted={this.deletedItem}
          allDelete={this.allDelete}
        />
      </section>
    )
  }
}

export default App
