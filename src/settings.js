import React from 'react';
import introImage from './media/image_scaled/ryan_coyoca_hero.jpg';

const settings = prepareSettings({
  title: 'A quick trip',
  intro: <React.Fragment>
    <p>Due to some disturbances in spacetime you were ripped out of your reality. Your soul is currently hovering in an endless void. You have no senses to feel anything yet you realize you can steer yourself to any of the myriad of realities scattered around you. Each one of them branching into countless others. In what world will you end up depends solely on your choices.</p>
  </React.Fragment>,
  introImage,
  currency: {
    gold: {
      name: 'Gold',
      value: 100,
    },
  },
});

function prepareSettings(currentSettings) {
  for (const slug in currentSettings.currencies) {
    const currency = currentSettings.currencies[slug];
    currency.slug = slug;
  }
  currentSettings.hideDisabledOptions = currentSettings.hideDisabledOptions === undefined ?
    false : currentSettings.hideDisabledOptions
  currentSettings.maxDepth = currentSettings.maxDepth === undefined ? 2 : currentSettings.maxDepth;
  return currentSettings;
}

export default settings;