import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import $ from 'cash-dom';
import './styles/style.scss';
import pipe from './pipe';
import OptionsContainer from './containers/OptionsContainer';
import OptionWideHead from './containers/OptionWideHead';
import getOption from './functions/getOption';
import Nav from './containers/Nav';

window.addEventListener('load', () => {
  $('body').addClass('unlocked');
  setTimeout(() => {
    $('.MainOverlay').remove();
  }, 300);
});

function getWideHead(option, props) {
  if (props.settings.usesStages) {
    if (props.path.length <= 1) return false;
  }
  if (props.path.length === 0) return false;
  return <OptionWideHead option={option} />;
}

function App(props) {
  useEffect(() => {
    if (pipe.scroll !== undefined) {
      const scrollOptions = { top: pipe.scroll };
      window.scrollTo(scrollOptions);
      pipe.scroll = undefined;
    }
    if (pipe.scrollAnchor !== undefined) {
      setTimeout(() => {
        const target = $(`#${pipe.scrollAnchor}`).offset().top - 16;
        window.scrollTo({
          top: target,
          behavior: 'smooth',
        });
        pipe.scrollAnchor = undefined;
      }, pipe.scrollSamePath ? 0 : 300);
    }
  });

  const dispatch = props.dispatch;
  useEffect(() => {
    window.history.replaceState({
      path: [],
    }, "");
    window.onpopstate = event => {
      if (event.state) {
        dispatch({
          type: 'CHANGE_PATH',
          scroll: window.scrollY,
          path: event.state.path,
          fromHistory: true,
        });
      }
    };
  }, [dispatch]);

  const option = getOption(props.path, props.options);
  return (
    <div className="App">
      <div className="MainOverlay">
        <svg className="loader" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>
      <Nav option={option} />
      {getWideHead(option, props)}
      <OptionsContainer option={option} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    options: state.options,
    path: state.path,
  };
}

export default connect(mapStateToProps)(App);
