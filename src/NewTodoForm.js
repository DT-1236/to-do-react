import React, { Component } from 'react';

class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    // do something with form data
    //this.props.addATask
    this.props.addATask(this.state);
    this.setState({ task: '' });
  }
  handleChange(evt) {
    // runs on every keystroke event
    this.setState({ task: evt.target.value });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="task">New Task:</label>
        <input
          name="task"
          value={this.state.task}
          onChange={this.handleChange}
        />
        <button>Add!</button>
      </form>
    );
  }
}
export default NewTodoForm;
