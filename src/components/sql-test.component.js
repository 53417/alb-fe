import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class SqlTest extends Component {

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Example Question:</h3>
                <p>Write a query to get the number of unique Google users whose last login was in July, 2019, broken down by device type. Show the most used device in that period first.</p>
              </div>
            </div>

            <h4>Schemas</h4>

            <strong>users</strong>
            <table className="table">
              <thead>
              <tr>
                <th scope="col">Column</th>
                <th scope="col">Type</th>
                <th scope="col">Nullable</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">user_id</th>
                <td>int</td>
                <td>not null</td>
              </tr>
              <tr>
                <th scope="row">is_activated</th>
                <td>boolean</td>
                <td>not null</td>
              </tr>
              <tr>
                <th scope="row">signed_up_on</th>
                <td>datetime</td>
                <td>nullable</td>
              </tr>
              <tr>
                <th scope="row">sign_up_source</th>
                <td>string</td>
                <td>nullable</td>
              </tr>
              <tr>
                <th scope="row">unsubscribed</th>
                <td>tinyint</td>
                <td>not null</td>
              </tr>
              <tr>
                <th scope="row">user_type</th>
                <td>tinyint</td>
                <td>not null</td>
              </tr>
              </tbody>
            </table>

            <strong>google_users</strong>
            <table className="table">
              <thead>
              <tr>
                <th scope="col">Column</th>
                <th scope="col">Type</th>
                <th scope="col">Nullable</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">id</th>
                <td>int</td>
                <td>not null</td>
              </tr>
              <tr>
                <th scope="row">user_id</th>
                <td>int</td>
                <td>not null</td>
              </tr>
              <tr>
                <th scope="row">browser_language_code</th>
                <td>string</td>
                <td>not null</td>
              </tr>
              <tr>
                <th scope="row">created_on</th>
                <td>datetime</td>
                <td>not null</td>
              </tr>
              <tr>
                <th scope="row">device_cat</th>
                <td>string</td>
                <td>not null</td>
              </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-6">
            <h4>Input:</h4>
            <div className="form-floating">
              <textarea className="form-control" placeholder="input query" id="sqlInput" rows="10"></textarea>
            </div>

            <button type="button" className="btn btn-secondary">Execute Query</button>
            
            <div className="card">
              <h4>Output:</h4>
              <div className="card-body">
                <p>Desktop | 99<br />Mobile | 43<br />Tablet | 16</p>
              </div>
            </div>
            <button type="button" className="btn btn-primary">Submit Response</button>
          </div>
        </div>
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

export default connect(mapStateToProps)(SqlTest);
