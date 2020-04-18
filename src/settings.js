import React from 'react';
import prepareSettings from './functions/prepareSettings';

const settings = prepareSettings({
  title: 'Things to want',
  intro: <p>Intro text.</p>,
  currency: {
    essence: {
      name: 'Essence',
      value: 10,
    },
    time: {
      name: 'Time',
      value: 8,
    },
  },
  hideDisabledOptions: true,
});

export default settings;