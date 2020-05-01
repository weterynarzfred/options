import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './styles/style.scss';
import OptionsContainer from './containers/OptionsContainer';
import OptionWideHead from './containers/OptionWideHead';
import getOption from './functions/getOption';
import Nav from './containers/Nav';
import $ from 'cash-dom';
import pipe from './pipe';

$(window).on('load', () => {
  $('body').addClass('unlocked');
  setTimeout(() => {
    $('.MainOverlay').remove();
  }, 300);
});

function App(props) {
  useEffect(() => {
    if (pipe.scroll !== undefined) {
      window.scroll(0, pipe.scroll);
      pipe.scroll = undefined;
    }
  });

  const option = getOption(props.path, props.options);
  return (
    <div className="App">
      <div className="MainOverlay">
        <svg className="loader" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>
      <Nav option={option} />
      {props.path.length === 0 ? false :
        <OptionWideHead option={option} />
      }
      <OptionsContainer option={option} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    path: state.path.map(e => e.slug),
    options: state.options,
  };
}

export default connect(mapStateToProps)(App);
