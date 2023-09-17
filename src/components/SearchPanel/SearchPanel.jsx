import React, { useState } from 'react'

import './SearchPanel.scss'

const SearchPanel = ({ onAddition }) => {
  const [task, setTask] = useState()
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  const getTask = (event) => {
    setTask(event.target.value)
  }

  const getMin = (event) => {
    setMin(event.target.value)
  }
  const getSec = (event) => {
    setSec(event.target.value)
  }
  const submit = (event) => {
    event.target.querySelector('.NewTodo').value = ''
    event.preventDefault()
    onAddition(task, min, sec)
  }
  return (
    <form onSubmit={submit}>
      <label className="HeaderConteiner">
        <input
          type="text"
          className="NewTodo"
          placeholder="What needs to be done?"
          autoFocus
          required
          onChange={getTask}
        />
        <input type="number" min="0" placeholder="Min" className="TimerMin" onChange={getMin} />
        <input type="number" min="0" max="59" placeholder="Sec" className="TimerSec" onChange={getSec} />
      </label>
      <input type="submit" style={{ display: 'none' }} />
    </form>
  )
}

export default SearchPanel
