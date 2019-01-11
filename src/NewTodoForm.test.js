import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NewTodoForm from './NewTodoForm';
//in src/**-test.js

//smokeTest

describe('simple smoking snapshots', function() {
  it('renders without crushing', () => {
    shallow(<NewTodoForm />);
  });
  it('matches snapshot', function() {
    let wrapper = shallow(<NewTodoForm />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
});

describe('updating form on change event', () => {
  const wrapper = shallow(<NewTodoForm />);
  let input = wrapper.find('input');
  input.simulate('change', { target: { name: 'task', value: 'test' } });
  input = wrapper.find('input');
  expect(input.props().value).toBe('test');
  expect(wrapper.state().task).toBe('test');
});
