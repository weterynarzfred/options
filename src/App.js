import React from 'react';
import './styles/style.scss';
import HeadSection from './containers/HeadSection';
import Content from './containers/Content';

function App(props) {
  return (
    <div className="App">
      <HeadSection />
      <Content />
    </div>
  );
}

export default App;
