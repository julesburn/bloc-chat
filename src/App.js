import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: "AIzaSyC0YBs_byzdaOmeXnqhgQ39Aw_V-YioWqY",
  authDomain: "feelin-chatty.firebaseapp.com",
  databaseURL: "https://feelin-chatty.firebaseio.com",
  projectId: "feelin-chatty",
  storageBucket: "feelin-chatty.appspot.com",
  messagingSenderId: "178468973529"
};
firebase.initializeApp(config);

  class App extends Component {
    constructor(props){
      super(props);
        this.state = {
          activeRoom: null,
          activeRoomId: "",
          currentUser: "Guest User"
        }
    }

    setActiveRoom = (selectedRoom) => {
      this.setState({activeRoom: selectedRoom.name });
      this.setState({activeRoomId: selectedRoom.key });
    }

    render() {
      return (
        <div className="App">
          <div className="header">
            <header>Feelin' Chatty</header>
          </div>
          <div className="roomList">
          <RoomList
            firebase = {firebase}
            setActiveRoom={this.setActiveRoom.bind(this)}
            />
          </div>
          <div className="container">
            <div className="messageList">
              <MessageList
              firebase = {firebase}
              activeRoom={this.state.activeRoom}
              activeRoomId={this.state.activeRoomId}
              user={this.state.currentUser}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  export default App;
