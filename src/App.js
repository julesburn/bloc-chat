import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoonList from './components/RoomList';

<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase.js"></script>
  // Initialize Firebase
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
    render() {
      return (
        <div className="App">
          <header>
            <nav className="navbar">
              <div className="container">
                <div class="navbar" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav"><Link to='/'className="nav">Home</Link></li>
                    <li className="nav"><Link to='/library'className="nav">Rooms</Link></li>
                  </ul>
                </div>
             </div>
            </nav>
            <h1>Feelin Chatty</h1>
          </header>
          <main>
            <Route path="/RoomList" component={RoomList} />
          </main>
        </div>
      );
    }
  }

  export default App;
