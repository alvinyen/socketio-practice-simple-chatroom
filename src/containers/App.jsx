import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      handle: '',
      message: '',
      messageData: [],
      feedback: '',
      named: false,
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
        this.setState({feedback: ''});
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
    this.setState({ message: '' });
  }
  handleUnLockClick = (event) => {
    this.setState({ named: false });
    if ( this.state.message === '' ) return;
    this.socket.emit('chat', {
      message: this.state.message,
      handle: this.state.handle
    });
    this.setState({ message: '' });
  }
  handleFeedbackDivKeyPress = (event) => {
    console.log(this.state.handle);
    this.socket.emit('typing', this.state.handle);
  }
  handleHandleKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.setState({ named: true });
    }
  }

  handleMessageKeyUp = (event) => {
    if (event.keyCode === 13) {
      if ( this.state.message === '' ) return;
      this.socket.emit('chat', {
        message: this.state.message,
        handle: this.state.handle
      });
      this.setState({ message: '' });
    }
  }

  getStyles = () => {
    return {
      title: {
        width: '300px',
        color: '#5162D2',
        fontSize: '28px',
        display: 'inline-block',
        margin: '0 auto',
      },
      handle: {
        borderTop: '1px solid #DDDDDD',
      },
      disabled: {
        border: 'red 5px solid',
      },
      alignRight: {
        textAlign: 'right',
      },
      alignLeft: {
        textAlign: 'left',
      },
      messageBlock: {
        wordWrap: 'break-word', 
        wordBreak: 'break-all', 
        overflow: 'hidden',

        display: 'inline-block',
        border: '1px solid #DDDDDD',
        borderRadius: '1.3em',
        maxWidth: '200px',
        backgroundColor: '#008AF8',
        padding: '10px',
        color: 'white',
        textAlign: 'justify',
      }
    };
  }
  getMessageBlock = (msg) => {
      return <div style={this.getStyles().messageBlock}>{msg}</div>
  }
  render() {
    const { messageData, handle } = this.state;
    const styles = this.getStyles();
    
    const messageParagraph = messageData.map( (data, index) => {
      const yourself = handle === data.handle;
      return <p key={data + index} style={ yourself ? styles.alignRight : styles.alignLeft }>
                {( yourself ? <div></div> : <strong>{`${data.handle}：`} </strong>)}  {this.getMessageBlock(data.message)}
            </p>;
    });
    return (
      <div id="mario-chat">
        <div id="chat-title-container">
          <div style={styles.title}>simple chat room</div>
        </div>
  
        <div id="chat-window">
          <div id="output">{messageParagraph}</div>
          <div id="feedback">{this.state.feedback}</div>
        </div>

        <div style={ this.state.named ? styles.disabled: {} }>
          <input 
            style={styles.handle}
            type="text" 
            id="handle" 
            name="handle" 
            placeholder="name.."
            value={this.state.handle}
            onKeyUp={this.handleHandleKeyUp}
            onChange={this.handleChange} 
            disabled={this.state.named ? 'disabled' : ''}
          />
        </div>
        { this.state.named ? <button id="unlock" onClick={this.handleUnLockClick}>Click to unLock.</button> : '' }
        <div style={ !this.state.named ? styles.disabled: {} }>
          <input 
            type="text" 
            id="message" 
            name="message" 
            placeholder="message.."
            onKeyUp={this.handleMessageKeyUp}
            value={this.state.message}
            onChange={this.handleChange} 
            onKeyPress={this.handleFeedbackDivKeyPress} 
            disabled={ !this.state.named ? 'disabled' : ''}
          />
          {/* <button id="send" onClick={this.handleSendClick} disabled={ !this.state.named ? 'disabled' : ''} >Send</button> */}
          { !this.state.named ? <button disabled id="unlock">Locked, pls enter your name above to unlock.</button> : '' }
        </div>
      </div>
    );
  }
}

export default App;
