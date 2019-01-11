import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';
//in src/**-test.js

//smokeTest

describe('simple smoking snapshots', function() {
  it('renders without crushing', () => {
    shallow(<TodoList />);
  });
  it('matches snapshot', function() {
    let wrapper = shallow(<TodoList />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
  it('initial state', () => {
    let wrapper = shallow(<TodoList />);
    expect(wrapper.state().tasks).toEqual({});
  });
});

describe('the todoList can do add, delete and ...', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<TodoList />);
    let form = wrapper.find('form');
    let input = wrapper.find('input');
    input.simulate('change', { target: { name: 'task', value: 'test' } });
    form.simulate('submit');
  });
  afterEach(() => {
    wrapper.setState({
      tasks: {}
    });
  });

  it('the todoList can add a task', () => {
    expect(Object.keys(wrapper.state().tasks)).toHaveLength(1);
  });

  it('the todoList can remove a task', () => {
    let deleteBtn = wrapper.find('button[name="delete"]');
    deleteBtn.simulate('click');
    expect(Object.keys(wrapper.state().tasks)).toHaveLength(0);
  });

  it('the todoList can update a task', () => {
    let editButton = wrapper.find("button[name='edit']");
    editButton.simulate('click');
    let input = wrapper.find('input[name="content"]');
    input.simulate('change', { target: { name: 'content', value: 'updated' } });
    editButton.simulate('click');
    expect(Object.values(wrapper.state().tasks)[0]).toEqual('updated');
  });

  // it('edit mode, change the input', () => {
  //   let editButton = wrapper.find("button[name='edit']");
  //   editButton.simulate('click');
  //   expect(wrapper.state().isEdit).toBe(true);
  //   let input = wrapper.find('input');
  //   input.simulate('change', { target: { name: 'content', value: 'a' } });
  //   input = wrapper.find('input');
  //   expect(input.props().value).toBe('a');
  //   expect(wrapper.state().content).toBe('a');
  // });
});
