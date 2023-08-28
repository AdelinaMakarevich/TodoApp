import React from 'react';

import './search-panel.css';

class SearchPanel extends React.Component {
  constructor() {
    super();
    this.keyCheck = (event) => {
      if (event.keyCode == 13) {
        this.props.onAddition(event.target.value);
        event.target.value = '';
      }
    };
  }
  render() {
    return (
      <input type="text" className="new-todo" placeholder="What needs to be done?" autoFocus onKeyUp={this.keyCheck} />
    );
  }
}
export default SearchPanel;
