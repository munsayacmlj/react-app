import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../styles/Book.css';

class Book extends Component {
  
  componentDidMount = () => {
    console.log("Book did mount");
  }
  

  handleClick = (e, data) => {
    this.props.sendData(data);
    if (typeof Storage !== "undefined") {
      localStorage.setItem("bookDetails", JSON.stringify(data));
    } else {
      console.log("Sorry! No web storage support!");
    }
  }

  render() {
    const { details, url } = this.props;
    // const URLtitle = details.title.toLowerCase().split(' ').join('_');
    return (
      <div className="book">
        <div className="book__header">
          <h3 className="book__title">{details.title}</h3>
        </div>
        <div className="book__body">
          <Link to={`${url}/${details.id}`} className="book__link" onClick={((e) => this.handleClick(e, details))}>
            <img className="book__cover" src={details.image}></img>
          </Link>
          <p>
            <span className="book__author">{details.author}</span>
            <span className="book__rating">{details.rating}</span>
          </p>
          <p className="book__description">{details.description}</p>
        </div>
      </div>
    );
  }
}

export default Book;