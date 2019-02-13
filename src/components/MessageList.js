import React, { Component } from 'react';
import SendMessage from './SendMessage';
import '../roomdisplay.css';
import { convertDateTime } from '../util/timedate';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages : [],
      newMessage: {
        content: '',
        createdAt: '',
        roomId: '',
        username: '',
        key: '',
      }
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
    };


  componentDidMount() {

    this.messagesRef.orderByChild("key").on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;

    this.setState({
      messages: this.state.messages.concat(message)
    })
  });
}

setMessage(e){

  const newMessage = {
    content: e.target.value,
    createdAt: '',
    roomId: this.props.activeRoom.key,
    username: this.props.userInfo.displayName,
    key: ''
  }

  this.setState({  newMessage: newMessage });

}

sendMessage(e){
  e.preventDefault();

  this.messagesRef.push({
    content: this.state.newMessage.content,
    createdAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.state.newMessage.roomId,
    username: this.state.newMessage.username
   }).then(() => {

    this.setState({
      newMessage: {
        content: '',
        createdAt: '',
        roomId: '',
        username: '',
        key: ''
      }
    });

   })

}

deleteMessage(key) {
  const filteredMessages= this.state.messages.filter(m => m.key !== key)
  this.messagesRef.child(key).remove(function(error){
    if (error){
      console.log(error)
      return false;
    }
  })
  this.setState({ messages : filteredMessages })
}


render() {
  return(


  <div>
    <h1 className="bg-light mx-auto border border-dark rounded-pill p-3" >{this.props.activeRoom.name}</h1>
    <hr className="hr-light" />
    {this.state.messages.filter(message => (
      message.roomId === this.props.activeRoom.key
    )).map(message => (
      <div key={message.key}>

      <div className="row mx-auto border border-dark rounded-pill p-3">

        <div className="col-10">
          <p className="text-dark font-weight-bold">{message.username}</p>
          <p className="text-dark">{message.content}</p>
        </div>

        <div className="col-2 text-right">
           <p className="text-message-time">{convertDateTime(message.createdAt)}&nbsp;<i className="fas fa-trash-alt nav-link" onClick={() => this.deleteMessage(message.key)}></i></p>
        </div>

        </div>
        <hr className="hr-light" />
      </div>
    )
    )}

    <SendMessage
      firebase={this.props.firebase}
      setMessage={(e) => this.setMessage(e)}
      sendMessage={(e) => this.sendMessage(e)}
      newMessage={this.state.newMessage.content}
      />
  </div>
);
}
}

export default MessageList;
