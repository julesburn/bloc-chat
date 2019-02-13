import React, { Component } from "react";

class User extends Component {

  constructor(props) {
    super(props);
    this.provider = new this.props.firebase.auth.GoogleAuthProvider();
  }

  signIn() {
    this.props.firebase.auth().signInWithPopup(this.provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    }).catch(function(error) {
    console.log(`error ${error.code} ${error.message}`)
      });
    }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUserInfo(user);
  });
}


  signOut() {
      this.props.firebase.auth().signOut().then(function () {
      }).catch(function(error){
      });
  }

  render() {
    return (

      <nav className="navbar justify-content-md-end px-0 pt-3 pb-3">
        <div className="px-3">
        {this.props.userInfo.isLoggedIn ? (
          <button
          onClick={() => this.signOut()}
          className="btn btn-secondary login">Sign Out</button>
        ) : (
          <button
          onClick={() => this.signIn()}
          className="btn btn-primary login">Sign In</button>
        )
      }
      </div>
      <div className="user-info bg-light border border-dark rounded-pill p-3">
        <span className="user-title">{this.props.userInfo.displayName}</span><br/>
        <span className="user-subtitle">{this.props.userInfo.email}</span>
        </div>
        <div className="px-3"><img src={this.props.userInfo.photoURL} className="w-25 h-25 rounded-circle" alt="" /></div>

      </nav>

    )
  }
}

export default User;
