import React, { Component } from 'react';
import uuid from 'uuid/v4';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';

class TodoList extends Component {
  constructor(props) {
    super(props);
    //task is an object with uuid as the key
    this.state = { tasks: {} };
    this.creatNewTask = this.creatNewTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }
  //create a new task
  creatNewTask({ task }) {
    // create a new obj in this.state.tasks
    // make a copy of the currst, add this obj to the curst, and setState witt the new state
    let curTasks = { ...this.state.tasks };
    curTasks = { ...curTasks, [uuid()]: task };
    this.setState({ tasks: curTasks });
  }

  // render a list of the list in the this.state
  renderTasks() {
    const result = Object.keys(this.state.tasks).map(id => (
      <Todo
        key={id}
        id={id}
        task={this.state.tasks[id]}
        remove={this.removeTask}
        editTask={this.editTask}
      />
    ));
    return result;
  }

  //delete function according to the id of the to do, which is also the key in this.state.tasks key
  removeTask(id) {
    let curSt = { ...this.state };
    let curTasks = curSt.tasks;
    delete curTasks[id];
    curSt = { tasks: curTasks };
    this.setState(curSt);
  }

  editTask(id, content) {
    //get the object
    console.log(id, content);
    let curTasks = { ...this.state.tasks };
    curTasks[id] = content;
    this.setState({ tasks: curTasks });
  }

  render() {
    return (
      <div>
        <NewTodoForm addATask={this.creatNewTask} />
        <ul>{this.renderTasks()}</ul>
      </div>
    );
  }
}
export default TodoList;
