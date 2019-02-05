import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
          user: null,
        }
    }

    setActiveRoom = (selectedRoom) => {
      this.setState({activeRoom: selectedRoom.name });
      this.setState({activeRoomId: selectedRoom.key });
    }

    setUser = (user) => {
      this.setState({user: user});
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
              />
            <div className="User">
              <User firebase={firebase}
              setUser={this.setUser}
              user={this.state.user}
              />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default App;
