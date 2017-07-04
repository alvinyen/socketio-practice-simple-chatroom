import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      handle: '',
      message: '',
      messageData: []
     };
  }
  componentDidMount = () => {
    this.socket = io('/'); // connect to socket-io server
    // console.log(this.socket);
    this.socket.on('chat', (data) => {
      this.setState({ messageData: [...this.state.messageData, data] });
    });
  }
  handleChange = (event) => {
    switch(event.target.name){
      case 'handle':
        this.setState({handle: event.target.value});
        break;
      case 'message':
        this.setState({message: event.target.value});
        break;
      default: 
        console.log('no input been matched');
        break;
    }
    // console.log(`${event.target.name}: ${this.state[event.target.name]}`);
  }
  handleSendClick = (event) => {
    console.log(this.socket);
    this.socket.emit('chat', {
      message: this.state.message,
      handle: this.state.handle
    });
    this.setState({ message: '', handle: '' });
  }
  render() {
    const { messageData } = this.state;
    const messageParagraph = messageData.map( (data, index) => {
      return <p key={data + index}><strong>{`${data.handle}：`}</strong>{`${data.message}`}</p>;
    });
    return (
      <div id="mario-chat">
        <h1>socketio-practice-simple-chatroom</h1>
        <div id="chat-window">
          <div id="output">{messageParagraph}</div>
        </div>
        <input 
          type="text" 
          id="handle" 
          name="handle" 
          placeholder="handle.."
          value={this.state.handle}
          onChange={this.handleChange} />
        <input 
          type="text" 
          id="message" 
          name="message" 
          placeholder="message.."
          value={this.state.message}
          onChange={this.handleChange} />
        <button id="send" onClick={this.handleSendClick}>Send</button>
      </div>
    );
  }
}

export default App;
