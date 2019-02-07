
import React, { Component } from 'react';
import '.././roomdisplay.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rooms : [],
        newRoom: '',
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

handleChange(event){
  this.setState({newRoom: event.target.value});
}

createRoom(e){
  this.roomsRef.push({
    name: this.state.newRoom
  });
  this.setState({newRoom: ''})
  e.preventDefault();
}

setRoom(room){
  this.props.setActiveRoom(room);
  console.log(room)
}

render() {
  return(
    <section>
      <div><h2>Room List</h2></div>

      {this.state.rooms.map( room =>
        <h3 key={room.key}
        className={room.key === this.props.activeRoomId ? "aciveRoom": ''}
        onClick={() => this.setRoom(room)}>{room.name}</h3>
    )}
      <form onSubmit={(event) => this.createRoom(event)}>
        <input type="text" value={this.state.newRoom} placeholder="Enter Name" onChange={ (e) => this.handleChange(e)}/>
        <button className="btn" type="submit">Create New Room</button>
      </form>
    </section>
  );
}
}

export default RoomList;
