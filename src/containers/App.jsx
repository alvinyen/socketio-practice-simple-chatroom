import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { test: '' };
  }
  render() {
    return (
      <div>
        <h1>socketio-practice-simple-chatroom</h1>
      </div>
    );
  }
}

export default App;
