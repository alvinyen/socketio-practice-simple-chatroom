import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      handle: '',
      message: '',
      messageData: [],
      feedback: ''
     };
  }
  componentDidMount = () => {
    this.socket = io('/'); // connect to socket-io server
    // console.log(this.socket);
    this.socket.on('chat', (data) => {
      this.setState({ feedback: '' });
      this.setState({ messageData: [...this.state.messageData, data] });
    });
    this.socket.on('typing', (handle) => {
      this.setState({ feedback: <p><em>{ `${handle} is typing message...` }</em></p> });
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
    
    this.socket.emit('chat', {
      message: this.state.message,
      handle: this.state.handle
    });
    this.setState({ message: '', handle: '' });
  }
  handleFeedbackDivKeyPress = (event) => {
    console.log(this.state.handle);
    this.socket.emit('typing', this.state.handle);
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
          <div id="feedback">{this.state.feedback}</div>
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
          onChange={this.handleChange} 
          onKeyPress={this.handleFeedbackDivKeyPress} />
        <button id="send" onClick={this.handleSendClick}>Send</button>
      </div>
    );
  }
}

export default App;
