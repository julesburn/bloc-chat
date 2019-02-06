import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
  });
}

  handleSignIn = () => {
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup( provider ).then(result =>{
        var user = result.user.displayName;
        this.props.setUser(user);
      });
}

  handleSignOut() {
      this.props.firebase.auth().signOut().then( () => {
          this.props.setUser(null);
      });
  }

  render() {
    return (
      <section className="User">
        <div>
        <p>Signed in as: {this.props.user ? this.props.user.displayName: "Guest"}</p>
        </div>
        <button onClick={() => this.handleSignIn()}>Sign In</button>
        <button onClick={() => this.handleSignOut()}>Sign Out</button>
      </section>
    );
  }
}

export default User;
