import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import ChatRoom from './components/ChatRoom';

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

        this.defaultUserInfo = {
          displayName: "Guest",
          email: '',
          photoURL: <i class="far fa-user-circle"></i>,
          isLoggedIn: false
        }

        this.state = {
          activeRoom: {},
          roomToDelete: {},
          userInfo: this.defaultUserInfo
    };

    this.roomsRef = firebase.database().ref("rooms");
    this.roomsRef.orderByChild("order_by_name").limitToFirst(1).on("child_added", snapshot => {
      const activeRoom = snapshot.val();
      activeRoom.key = snapshot.key;
      this.setState({activeRoom: activeRoom});
    })
  }

  setActiveRoom(room){
    this.setState({ activeRoom: room });
  }

    setRoomToDelete(room) {
      this.setState({ roomToDelete: room })
    }

    setUserInfo(user) {
      user === null ? this.setState({userInfo: this.defaultUserInfo}) : this.setSTate(
        {userInfo: {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isLoggedIn: true
        }})
      }

    render() {
      return (
        <div>
          <ChatRoom
            firebase={firebase}
            setActiveRoom={(room) => this.setActiveRoom(room)}
            setUserInfo={(user) => this.setUserInfo(user)}
            setRoomToDelete={(room) => this.setRoomToDelete(room)}
            activeRoom={this.state.activeRoom}
            roomToDelete={this.state.roomToDelete}
            userInfo={this.state.userInfo}
            />
        </div>
      );
    }
  }

  export default App;
