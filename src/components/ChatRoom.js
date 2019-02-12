import React, { Component } from "react";
import RoomList from './RoomList';
import MessageList from './MessageList';
import User from './User';

class ChatRoom extends Component {

  render(){
    return(
      <div className="d-flex flex-row h-100">
        <div className="left-nav h-100 px-3 py-3">
          <RoomList
            firebase = {this.props.firebase}
            activeRoom={this.props.activeRoom}
            setRoomToDelete={(room) => this.props.setRoomToDelete(room)}
            />
          </div>
          <div className="container-fluid py-0 px-4">
            <User
              firebase={this.props.firebase}
              userInfo={this.props.userInfo}
              setUserInfo={(user) => this.props.setUserInfo(user)}
             />
            <MessageList
              firebase = {this.props.firebase}
              roomToDelete={this.props.roomToDelete}
              activeRoom={this.props.activeRoom}
              activeRoomId={this.props.activeRoomId}
              user={this.props.userInfo}
              />
            </div>
          </div>
      )
  }
}

export default ChatRoom;
