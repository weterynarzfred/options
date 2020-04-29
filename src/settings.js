import React from 'react';

const settings = prepareSettings({
  title: 'A quick trip',
  intro: <React.Fragment>
    <p>Due to some disturbances in spacetime you were ripped out of your reality. Your soul is currently hovering in an endless void. You have no senses to feel anything yet you realize you can steer yourself to any of the myriad of realities scattered around you. Each one of them branching into countless others. What choices will you make and in what world will you end?</p>
    <p>Any details that are not covered by this CYOA will get filled automaticaly to fit the general tone of what you chose.</p>
  </React.Fragment>,
  introImage: './image/ryan-coyoca-hero.jpg',
  currency: {
    gold: {
      name: 'Gold',
      value: 100,
    },
  },
});

function prepareSettings(settings) {
  for (const slug in settings.currencies) {
    const currency = settings.currencies[slug];
    currency.slug = slug;
  }
  settings.hideDisabledOptions = settings.hideDisabledOptions === undefined ?
    false : settings.hideDisabledOptions
  settings.maxDepth = settings.maxDepth === undefined ? 2 : settings.maxDepth;
  return settings;
}

export default settings;