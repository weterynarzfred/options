import getSuboptions from './getSubptions';

export default function getDepth(option, options) {
  const suboptions = getSuboptions(option, options, true);
  if (Object.keys(suboptions).length === 0) return 1;
  let depth = 0;
  for (const slug in suboptions) {
    const suboption = suboptions[slug];
    depth = Math.max(getDepth(suboption, options), depth);
  }
  return depth + 1;
}