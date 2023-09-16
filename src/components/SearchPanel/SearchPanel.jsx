import React from 'react'

import './SearchPanel.scss'

class SearchPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      task: '',
      min: 0,
      sec: 0,
    }
    this.getTask = (event) => {
      this.setState({
        task: event.target.value,
      })
    }

    this.getMin = (event) => {
      console.log(event.target.value)
      this.setState({
        min: event.target.value,
      })
    }
    this.getSec = (event) => {
      this.setState({
        sec: event.target.value,
      })
    }
    this.submit = (event) => {
      event.target.querySelector('.NewTodo').value = ''
      event.preventDefault()
      this.props.onAddition(this.state.task, this.state.min, this.state.sec)
    }
  }
  render() {
    return (
      <form onSubmit={this.submit}>
        <label className="HeaderConteiner">
          <input
            type="text"
            className="NewTodo"
            placeholder="What needs to be done?"
            autoFocus
            required
            value={this.state.value}
            onChange={this.getTask}
          />
          <input
            type="number"
            min="0"
            placeholder="Min"
            className="TimerMin"
            value={this.state.value}
            onChange={this.getMin}
          />
          <input
            type="number"
            min="0"
            max="59"
            placeholder="Sec"
            className="TimerSec"
            value={this.state.value}
            onChange={this.getSec}
          />
        </label>
        <input type="submit" style={{ display: 'none' }} />
      </form>
    )
  }
}

export default SearchPanel
