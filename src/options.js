import React from 'react';
import getOption from './functions/getOption';
// import getSelected from './functions/getSelected';
// import { clone } from './functions/helpers';

function select(arr, def = false) {
  for (const condition of arr) {
    if (condition[0]) return condition[1];
  }
  return def;
}

function _is(path) {
  const option = getOption(path, this.options);
  return option.selected > 0;
}

function _val(path) {
  const option = getOption(path, this.options);
  return option.selected;
}

function bindData(data) {
  return {
    is: _is.bind(data),
    val: _val.bind(data),
  };
}

const options = {
  body: {
    name: 'Body',
    type: 'story',
    text: data => {
      const { is, val } = bindData(data);
      const cute = is('cuteness') ? ' cute' : false;
      const gender = select([
        [is('gender/male'), val('age') > 15 ? 'man' : 'boy'],
        [is('gender/female'), val('age') > 15 ? 'woman' : 'girl'],
      ], 'blank slate');

      return <p>You are a{cute} {gender}. Choose from options below to specify your body.</p>
    },
  },
  cuteness: {
    name: 'Cuteness',
    text: <p>Are you cute?</p>
  },
  gender: {
    name: 'Gender',
    type: 'group',
    min: 1,
    text: <p>Are you a boy or a girl?</p>,
    options: {
      male: {
        name: 'Male',
        text: <p>You have male genitals, high testosterone, and all good things that come from being a man.</p>,
      },
      female: {
        name: 'Female',
        text: <p>You have female genitals, round breasts and hips. Unfortunately you also have periods.</p>,
      },
    },
  },
  age: {
    name: 'Age',
    min: 12,
    max: 36,
    selected: 18,
    text: <p>How old are you?</p>,
  }
};

export default options;
