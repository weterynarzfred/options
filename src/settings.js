const settings = prepareSettings({
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