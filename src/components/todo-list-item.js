import React from "react";
import { formatDistanceToNow } from 'date-fns';
import "./todo-list-item.css";

class TodoListItem extends React.Component {
  constructor() {
    super();
    this.onLabelClick = () => {
      this.props.onDone();
    };
    this.itemCheck = (event) => {
      this.props.onEdition(event.target.closest('div'))
    }
    this.timeCounter = () => {
      return (
        formatDistanceToNow(
          this.props.date
        )
      )
    }
  }
  render() {
    const { label, done, onDeleted } = this.props;

    let classNames = "description";
    if (done) {
      classNames += " done";
    }

    return (
      <div className="todo-list-item">
        <input className="toggle" type="checkbox" onClick={this.onLabelClick} />
        <label>
          <span className={classNames}>{label}</span>
          <span className="created">created {this.timeCounter()} ago</span>
        </label>
        <button className="icon icon-edit" onClick={this.itemCheck}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}

export default TodoListItem;
