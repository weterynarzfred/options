import pipe from './../pipe';
import getOption from '../functions/getOption';

export default function changePath(action, state) {
  let skipRecalculate = false;
  if (action.previous) {
    if (state.pathHistory.length === 0) return skipRecalculate;
    getOption(state.path, state.options).scroll = action.scroll;
    state.path = state.pathHistory.pop();
    pipe.scroll = getOption(state.path, state.options).scroll;
    skipRecalculate = true;
  }
  else {
    // save the current scroll pos
    if (state.path.length === 0) {
      state.settings.scroll = action.scroll;
    }
    else {
      const option = getOption(state.path, state.options);
      option.scroll = action.scroll;
    }
    // save previous path in th history
    state.pathHistory.push(state.path);
    // save new path to the state
    state.path = action.path.filter(e => e !== '');
    // inform about new scroll position
    if (state.path.length === 0) {
      pipe.scroll = state.settings.scroll;
    }
    else {
      pipe.scroll = getOption(state.path, state.options).scroll;
    }
    pipe.scroll = pipe.scroll ?? 0;
    // change stage if necessary
    if (action.isChangingStage) {
      state.settings.currentStage = state.path[0];
      // clear history
      state.pathHistory = [];
    }
    else skipRecalculate = true;
  }

  return skipRecalculate;
}