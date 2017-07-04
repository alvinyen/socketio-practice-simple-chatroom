import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { test: '' };
  }
  componentDidMonunt = () => {
    this.socket = io('/'); // connect to socket-io server

  }
  render() {
    return (
      <div id="mario-chat">
        <h1>socketio-practice-simple-chatroom</h1>
        <div id="chat-window">
          <div id="output"></div>
        </div>
        <input type="text" id="handl" placeholder="handle.."/>
        <input type="text" id="message" placeholder="message.." />
        <button id="send">Send</button>
      </div>
    );
  }
}

export default App;
