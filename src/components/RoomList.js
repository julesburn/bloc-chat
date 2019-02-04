
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';


class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rooms : [],
    }

    this.roomsRef = this.props.firebase.database().ref('rooms')
    };

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room )});
  });
}

render() {
  return(
    <section className={style.container}>
      <h1>Room List</h1>
      {this.state.rooms.map( (room =>
        <h1>key={room.key}>{room.name}</h1>
    )}
    </section>
  );
}

export default RoomList;
