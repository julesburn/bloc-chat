import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList : [],
      roomId: '',
      newMessage: '',
      user: '',
      sendAt: ''
}

    this.messagesRef = this.props.firebase.database().ref('messages');
    };

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
    this.setState({ messageList: this.state.messageList.concat( message )});
  });
}

handleChange(event) {
    this.setState({
        newMessage: event.target.value,
        roomId: this.props.activeRoomId
    });

}


handleCreateMessage(e){
  this.messagesRef.push({
    message: this.state.newMessage,
    roomId: this.state.roomId,
    sendAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    user: this.state.user
  })
  e.preventDefault();
  this.setState({newMessage: ''});
}

render() {
  return(
    <section>
    <div className="activeRoom">Active Room: {this.props.activeRoom}</div>
      <h2>Message List placeholder</h2>
      <h4>{this.props.activeRoom}</h4>
      <form onSubmit={(e) => this.handleCreateMessage(e)}>
        <input type="text" value={this.state.newMessage} onChange={ (e) => this.handleChange(e) }/>
        <button type="submit">Send Message</button>
      </form>

    { this.state.messageList.map( message =>
        {if (message.roomId === this.props.activeRoomId){
          return <h4 key={message.key}>{message.message}</h4>
        }
      return null;}
    )}

    </section>
  );
}
}

export default MessageList;
