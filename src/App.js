import React, { Component } from 'react';
import './App.css';
import Canvas from './modules/Canvas.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Canvas />
      </div>
    );
  }
}

export default App;
