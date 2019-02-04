import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        messageList: [],
        roomId: '',
        userName: '',
        sendAt: '',
        newMessage: '',
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
    };

  componentDidMount() {
    console.log(this.messagesRef)
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
    this.setState({ messageList: this.state.messageList.concat( message )});
  });
}

handleChange(event){
  this.setState({newMessage: event.target.value,
  roomId: this.props.activeRoom.key,
  userName: 'userName',
});
}


createNewMessage(e){
  this.messagesRef.push({
    message: this.state.newMessage,
    roomId: this.state.roomId,
    sendAt: this.firebase.database.ServerValue.TIMESTAMP,
    userName: this.state.userName
  });
  e.preventDefault();
  this.setState({newMessage: ''})
}

render() {
  return(
    <section>
      <h1>{this.props.activeRoom.name}</h1>
      <form onSubmit={(e) => this.createNewMessage(e)}>
        <input type="text" value={this.state.newMessage} placeholder="Enter Message" onChange={ (e) => this.handleChange(e)}/>
        <button type="submit">Send Message</button>
      </form>
      {this.state.messageList.map( message =>
        {if (message.roomId=== this.props.activeRoom.key){
          return <h4 key={message.key}>{message.message}</h4>
        }
        return null;}
    )}
    </section>
  );
}
}

export default MessageList;
