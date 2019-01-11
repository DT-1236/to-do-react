import React, { Component } from 'react';

class Todo extends Component {
  // add remove function from the parent TodoList
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isEdit: false,
      content: this.props.task
    };
  }
  handleRemove() {
    this.props.remove(this.props.id);
  }

  //handleEdit
  handleEdit() {
    //this.props.edit(this.props.id);
    // console.log(this.props.editTask);
    if (this.state.isEdit) {
      this.props.editTask(this.props.id, this.state.content);
      this.setState({ isEdit: false });
    } else {
      this.setState({ isEdit: true });
    }
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    const display = this.state.isEdit ? (
      <input
        onChange={this.handleChange}
        name="content"
        value={this.state.content}
        type="text"
      />
    ) : (
      this.props.task
    );
    return (
      <li>
        {display}
        <button name="delete" onClick={this.handleRemove}>
          delete
        </button>
        <button name="edit" onClick={this.handleEdit}>
          {this.state.isEdit ? 'Done' : 'Edit'}
        </button>
      </li>
    );
  }
}
export default Todo;
