import React, { Component } from 'react';
import './App.css';
import Canvas from './modules/Canvas.js';
import Invitation from './modules/Invitation.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Invitation />
        <Canvas />
      </div>
    );
  }
}

export default App;
