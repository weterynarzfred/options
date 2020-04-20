import React from 'react';
import prepareSettings from './functions/prepareSettings';

const settings = prepareSettings({
  title: 'A quick trip',
  intro: <React.Fragment>
    <p>You will be send on a small detour from your life. Or a big one, if you wish. Your current life will be frozen in time and your consciusnes will receive a new body in a new world. After a year and each year after that you will be given a choice to either come back to your old life continue to live your new one or move to another scenario. By default only your memories make it through each journey, but this might be changed.</p>
    <p>You can create as many scenarios as you want and you will be given access to this CYOA each time you are changing scenarios so you will be able to create new ones on the fly. Remember that whatever you create, you will have to live with for at least a year. Dying in any of the scenarios will allow you to either go back to your old life or to restart the scenario, but not to choose a new one.</p>
    <p>Any details that are not covered by this CYOA will get filled automaticaly to fit the general tone of what you chose. Choosing identical options multiple times will create slightly different results.</p>
  </React.Fragment>,
  introImage: './image/ryan-coyoca-hero.jpg',
  currency: {
    gold: {
      name: 'Gold',
      value: 10,
    },
    grace: {
      name: 'Grace',
      value: 0,
    },
  },
});

export default settings;