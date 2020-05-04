import pipe from './../pipe';
import getOption from '../functions/getOption';
import { clone } from '../functions/helpers';

export default function changePath(action, state) {
  let skipRecalculate = false;
  if (action.previous) {
    action.path = state.path.slice(0, state.path.length - 1);
  }
  // save the current scroll pos
  if (state.path.length === 0) {
    state.settings.scroll = action.scroll;
  }
  else {
    const option = getOption(state.path, state.options);
    option.scroll = action.scroll;
  }
  // save new path to the state
  const samePath = state.path.toString() === action.path.toString();
  state.path = action.path.filter(e => e !== '');

  if (!action.fromHistory) {
    // push state to the browser's history
    const historyState = { path: clone(state.path) };
    window.history.pushState(historyState, "");
  }

  // change stage if necessary
  if (action.isChangingStage) {
    state.settings.currentStage = state.path[0];
  }
  else skipRecalculate = true;

  // inform about new scroll position
  if (action.anchor !== undefined) {
    pipe.scrollAnchor = [...state.path, action.anchor].join('_');
    pipe.scrollSamePath = samePath;
  }
  if (state.path.length === 0) {
    pipe.scroll = state.settings.scroll;
  }
  else {
    pipe.scroll = getOption(state.path, state.options).scroll;
  }
  pipe.scroll = pipe.scroll ?? 0;

  return skipRecalculate;
}