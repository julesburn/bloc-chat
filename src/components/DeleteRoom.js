import React, { Component } from "react";
import {Modal} from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap/Button';

class DeleteRoom extends Component {

  constructor(props){
    super(props);

    this.state = {
      show: false,
    };
  }
  handleClose(room){
    if(room){ this.props.deleteRoom(room)}
    this.setState({ show: false });
  }
  handleShow(){
    this.setState({ show: true });
  }
  render(){
    return (
    <div>
    <i className="far fa-trash-alt" onClick={() => this.handleShow()}></i>
    <div class="modal" tabIndex="-1" role="dialog" show={this.state.show} onHide={() => this.handleClose()}>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Room?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete <span className="font-weight-bold">{this.props.room.name}</span>?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() =>this.handleClose()}>Cancel</button>
          <button type="button" class="btn btn-primary" onClick={() => this.handleClose(this.props.room.name)}>Yes, Delete Room</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}
}

export default DeleteRoom;
