import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Todo from './Todo';
//in src/**-test.js

//smokeTest

describe('simple smoking snapshots', function() {
  it('renders without crushing', () => {
    shallow(<Todo />);
  });

  it('matches snapshot', function() {
    let wrapper = shallow(<Todo />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
});

describe('the inital sstate is set correctly', () => {
  const wrapper = shallow(<Todo />);

  expect(wrapper.state().isEdit).toBe(false);
});

describe('the todo has two buttons and', () => {
  it('the todo has two button', () => {
    const wrapper = shallow(<Todo />);
    let buttons = wrapper.find('button');
    expect(buttons).toHaveLength(2);
  });

  it('edit button changes the state', () => {
    const wrapper = shallow(<Todo />);
    let editButton = wrapper.find("button[name='edit']");
    editButton.simulate('click');
    expect(wrapper.state().isEdit).toBe(true);
  });

  it('edit mode, change the input', () => {
    const wrapper = shallow(<Todo />);
    let editButton = wrapper.find("button[name='edit']");
    editButton.simulate('click');
    expect(wrapper.state().isEdit).toBe(true);
    let input = wrapper.find('input');
    input.simulate('change', { target: { name: 'content', value: 'a' } });
    input = wrapper.find('input');
    expect(input.props().value).toBe('a');
    expect(wrapper.state().content).toBe('a');
  });
});
