import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Role:</strong> {currentUser.user.roleId}
        </p>

        <button type="button" className="btn btn-outline-primary">
          <Link to={"/sqlTest"} className="nav-link">
            Start SQL Test
          </Link>
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
