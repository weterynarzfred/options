import React from 'react';
import Option from '../components/Option';

export default function displayOptions(options) {
  if (options === undefined) return;
  const result = [];
  for (const slug in options) {
    const option = options[slug];
    result.push(<Option option={option} key={`option-${option.path}`} />);
  }
  return result;
}
