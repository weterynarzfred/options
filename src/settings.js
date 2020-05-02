const settings = prepareSettings({
  usesStages: true,
  currentStage: 'options',
  currency: {
    gold: {
      name: 'Gold',
      value: 100,
    },
  },
});

function prepareSettings(sett) {
  for (const slug in sett.currencies) {
    const currency = sett.currencies[slug];
    currency.slug = slug;
  }
  sett.hideDisabledOptions = sett.hideDisabledOptions === undefined ?
    false : sett.hideDisabledOptions
  sett.maxDepth = sett.maxDepth === undefined ? 2 : sett.maxDepth;
  sett.usesStages = sett.usesStages === undefined ? 2 : sett.usesStages;

  return sett;
}

export default settings;