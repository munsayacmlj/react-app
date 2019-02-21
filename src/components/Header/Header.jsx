import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/Header.css';

class Header extends Component {

  render () {
    const activeStyle = {
      fontWeight: 'bold',
      color: 'red'
    };
    return(
      <header className="header">
        <ul className="header__list">
          <li>
            <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          </li>
          <li>
            <NavLink exact to="/books?querySort=default" activeStyle={activeStyle}>Books</NavLink>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;