import React, { Component } from 'react';
import '.././roomdisplay.css';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList : [],
      roomId: '',
      newMessage: '',
      username: '',
      sendAt: ''
}

    this.messagesRef = this.props.firebase.database().ref('messages');
    };


  componentDidMount() {
    console.log(this.messagesRef);
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
    this.setState({ messageList: this.state.messageList.concat( message )});
  });
}

handleChange(e) {
    this.setState({
        newMessage: e.target.value,
        roomId: this.props.activeRoomId,
        username: this.props.user ? this.props.user.displayName: "Guest"
    });

}


handleCreateMessage(e){
  this.messagesRef.push({
    message: this.state.newMessage,
    roomId: this.state.roomId,
    sendAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    user: this.state.username
  })
  this.setState({newMessage: ''});
  e.preventDefault();
}


render() {
  return(
    <section>
      <div className="column2 messageField">
        <div><h2>Room: {this.props.activeRoom}</h2></div>
        <h3>Chat Below</h3>

        {this.state.messageList.map( message =>
          {if (message.roomId === this.props.activeRoomId) {
            return <div key={message.key}><p>{message.user}:  {message.message}</p></div>

          }
          return null;}
      )}
      </div>
      <div>
        <form className="enterMessageField" onSubmit={(e) => this.handleCreateMessage(e)}>
          <input id="msgInput" type="text" placeholder="Enter Message" value={this.state.newMessage} onChange={ (e) => this.handleChange(e) }/>
          <button class="btn" type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}
}

export default MessageList;
