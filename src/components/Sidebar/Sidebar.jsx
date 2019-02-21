import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../../styles/Sidebar.css';

class Sidebar extends Component {
  
  handleClick = (e, type) => {
    this.props.sendSortType(type);
  }

  render() {
    return(
      <aside className="sidebar-sort">
        <NavLink className="sort" exact to="/books?querySort=aToZ" onClick={(e) => {this.handleClick(e, 'aToZ')}}>A-Z</NavLink>
        <NavLink className="sort" exact to="/books?querySort=zToA" onClick={(e) => {this.handleClick(e, 'zToA')}}>Z-A</NavLink>
        <NavLink className="sort" exact to="/books?querySort=ratingASC" onClick={(e) => {this.handleClick(e, 'ratingASC')}}>Rating ASC</NavLink>
        <NavLink className="sort" exact to="/books?querySort=ratingDESC" onClick={(e) => {this.handleClick(e, 'ratingDESC')}}>Rating DESC</NavLink>
      </aside>
    );
  }
}

export default Sidebar;
