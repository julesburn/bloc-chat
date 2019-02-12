
import React, { Component } from 'react';
import '.././roomdisplay.css';
import DeleteRoom from './DeleteRoom'

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rooms : [],
        newRoom: '',
        deletedRoom: '',
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

deleteRoom(room){
  const newRooms = this.state.rooms.filter( r => r.key !== room.key)

  this.roomsRef.child(room.key).remove(function(error){
    if(error){
      console.log(error)
      return false;
    }
  })
  this.props.setActiveRoom(newRooms[0])
  this.setState({rooms : newRooms})
}

render() {
  return(
    <div className="h-100">
      <form onSubmit={(event) => this.createRoom(event)}>
        <div className="input-group mb-3">
          <input type="text"
          value={this.state.newRoom}
          placeholder="Enter Name"
          onChange={ (e) => this.handleChange(e)}
          />
          <div className="input-group-append">
            <input className="btn btn-primary"
            type="submit"
            id="button-roomname"
            value="Create New Room"
            />
          </div>
        </div>
      </form>

    {this.state.rooms.map((room) =>{

        return(

          <div key={room.key}
           className={room.key === this.props.activeRoomId ? "nav-link active d-flex" : "nav-link d-flex"}>

            <div className="flex-grow-1" onClick={() => this.props.setActiveRoom(room)}>
              {room.name}
            </div>

      <DeleteRoom
        room={room}
        deleteRoom={(room) => this.deleteRoom(room)}
        setRoomToDelete={(room) => this.props.setRoomToDelete(room)}
        />

        
      </div>
    )
  })}
  </div>
    );
  }
}

export default RoomList;
