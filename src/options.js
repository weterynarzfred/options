import React from 'react';
import getOption from './functions/getOption';
import getSelected from './functions/getSelected';
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
  if (option.selected === undefined) {
    const selected = getSelected(option, this.options);
    if (selected.length === 0) return false;
    return selected[0].slug;
  }
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
      const cute = is('cuteness') ? ' a cute looking' : ' an average looking';
      const gender = select([
        [is('gender/male'), val('age') > 15 ? 'man' : 'boy'],
        [is('gender/female'), val('age') > 15 ? 'woman' : 'girl'],
      ], 'blank slate');
      const complexion = is('freckles') ? (select([
        [is('complexion/dark'), ' You have freckles but they are hardly visible with your dark complexion.'],
        [is('complexion/mild'), ' You have freckles and a mild complexion.'],
        [is('complexion/pale'), ' You have freckles clearly visible on your pale skin.'],
      ], ' You have freckles.')) : (val('complexion') ? select([
        [is('complexion/dark'), ' You have a dark skin.'],
        [is('complexion/mild'), ' You have mild complexion.'],
        [is('complexion/pale'), ' You have a pale skin.'],
      ]) : false);

      return <p>Choose from options below to specify your body. You are{cute} {gender}.{complexion}</p>
    },
  },
  gender: {
    name: 'Gender',
    type: 'group',
    min: 1,
    text: <p>Are you a boy or a girl?</p>,
    image: '',
    useImageOfSelected: true,
    options: {
      male: {
        name: 'Male',
        text: <p>You have male genitals, high testosterone, and all good things that come from being a man.</p>,
        image: './example/manly.jpg',
        selected: 1,
      },
      female: {
        name: 'Female',
        text: <p>You have female genitals, round breasts and hips. Unfortunately you also have periods.</p>,
        image: './example/teacher_ordinary.jpg',
      },
    },
  },
  cuteness: {
    name: 'Cuteness',
    text: <p>Are you a <strong>qt<span style={{ fontSize: '1.25em' }}>&#x1D70B;</span></strong>?</p>,
    image: './example/__original_drawn_by_shell_wwwtrista__678e4146199ced72171b10e542dbd660.png',
  },
  freckles: {
    name: 'Freckles',
    text: <p>Clusters of concentrated melaninized cells.</p>,
    image: './image/e0a3e482ffdf4274e41ef712b0d72d01.jpg',
    options: {
      face: {
        name: 'On your face',
        text: <p>Most of your freckles are concentrated on your face.</p>,
      },
      body: {
        name: 'On your whole body',
        text: <p>Freckles cover most of your body.</p>,
      },
    },
  },
  age: {
    name: 'Age',
    min: 12,
    max: 36,
    selected: 18,
    text: <p>How old are you?</p>,
    image: './example/age_normal.jpg',
  },
  complexion: {
    name: 'Complexion',
    type: 'group',
    min: 1,
    text: <p>How much melanin do you have in your skin?</p>,
    options: {
      dark: {
        name: 'Dark',
      },
      mild: {
        name: 'Mild',
        selected: 1,
      },
      pale: {
        name: 'Pale',
      },
    },
  },
};

export default options;
