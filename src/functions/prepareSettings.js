export default function prepareSettings(settings) {
  for (const slug in settings.currencies) {
    const currency = settings.currencies[slug];
    currency.slug = slug;
  }
  settings.hideDisabledOptions = settings.hideDisabledOptions === undefined ?
    false : settings.hideDisabledOptions
  return settings;
}