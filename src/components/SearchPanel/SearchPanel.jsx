import React from 'react'

import './SearchPanel.scss'

class SearchPanel extends React.Component {
  constructor() {
    super()
    this.keyCheck = (event) => {
      if (event.keyCode == 13 && event.target.value != 0 && event.target.value != /^\s+$/) {
        this.props.onAddition(event.target.value)
        event.target.value = ''
      }
    }
  }
  render() {
    return (
      <input
        type="text"
        className="NewTodo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyUp={this.keyCheck}
        required
      />
    )
  }
}

export default SearchPanel
