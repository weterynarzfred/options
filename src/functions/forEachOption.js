import getSubptions from "./getSubptions";

export default function forEachOption(parentOption, state, callback, prepareCallback) {
  if (prepareCallback !== undefined) {
    prepareCallback(parentOption, state);
  }

  if (
    state.settings.usesStages &&
    parentOption.path !== undefined &&
    parentOption.path.split('/')[0] !== state.settings.currentStage
  ) {
    return;
  }

  const suboptions = getSubptions(parentOption, state.options);
  for (const slug in suboptions) {
    const option = suboptions[slug];
    callback(option, parentOption, state);
    forEachOption(option, state, callback, prepareCallback);
  }
}