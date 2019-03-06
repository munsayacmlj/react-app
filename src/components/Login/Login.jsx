import React, { Component } from 'react';
import NACL_factory from 'js-nacl/lib/nacl_factory';
import '../../styles/Login.css';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (e, property) => {
    this.setState({
      [property]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {username} = this.state;
    const {password} = this.state;
  }

  render() {
    return (
      <form className="login-form">
        <div className="login-form__containers">
          <label htmlFor="username">Username</label>
          <input type="text" value={this.state.username} onChange={(e) => this.handleChange(e, 'username')} name="username" id="username"></input>
        </div>

        <div className="login-form__containers">
          <label htmlFor="password">Password</label>
          <input type="password" value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} name="password" id="password"></input>
        </div>

        <input type="submit" onClick={this.handleSubmit} className="btn btn-success" id="loginSubmit"></input>
      </form>
    );
  }
}

export default Login;
