import React from 'react';
import prepareSettings from './functions/prepareSettings';

const settings = prepareSettings({
  title: 'A quick trip',
  intro: <React.Fragment>
    <p>You will be send on a small detour from your life. Or a big one, if you wish. Your current life will be frozen in time and your consciusnes will receive a new body in a new world. After a year and each year after that you will be given a choice to come back to your old life. By default only your memories make it back, but this might be changed.</p>
  </React.Fragment>,
  introImage: './image/ryan-coyoca-hero.jpg',
  currency: {
    gold: {
      name: 'Gold',
      value: 10,
    },
  },
});

export default settings;