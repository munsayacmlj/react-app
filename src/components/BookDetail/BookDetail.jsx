import React, { Component } from 'react';
import Modal from 'react-modal';
import '../../styles/BookDetail.css';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class BookDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      bookTitle: '',
      bookAuthor: '',
      bookRating: '',
      bookImage: '',
      bookDescription: ''
    }
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState(this.baseState);
    this.setState({modalIsOpen: false});
  }

  componentDidMount = () => {
    let { bookDetails } = this.props;
    if (Object.entries(bookDetails).length === 0 && bookDetails.constructor === Object) {
      bookDetails = JSON.parse(localStorage.getItem("bookDetails"));

      this.setState({
        bookTitle: bookDetails.title,
        bookAuthor: bookDetails.author,
        bookRating: bookDetails.rating,
        bookImage: bookDetails.image,
        bookDescription: bookDetails.description,

      });
    } else {
      this.setState({
        bookTitle: bookDetails.title,
        bookAuthor: bookDetails.author,
        bookRating: bookDetails.rating,
        bookImage: bookDetails.image,
        bookDescription: bookDetails.description
      });
    }
  }

  handleChange = (e, state) => {
    this.setState({
      [state]: e.target.value 
    })
  }

  render() {
    const { bookTitle, bookAuthor, bookRating, bookImage, bookDescription } = this.state;
    
    return (
      <React.Fragment>
        <div className="book-detail">
          <button onClick={this.openModal} className="edit-button">Edit</button>
          <h1>{bookTitle}</h1>
          <img src={bookImage}></img>
          <p>
            <span>{bookAuthor}</span>
            <span>{bookRating}</span>
          </p>
          <p>{bookDescription}</p>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          overlayClassName="overlay"
          className="book-modal-content"
          contentLabel="Book Modal"
        >
          <button className="close-modal" onClick={this.closeModal}>Close</button>
          <p><strong>Edit</strong></p>
          <form method="POST">
            <div className="book-modal-content__body">
              <div className="book-modal-content__title">
                <label>Title</label>
                <input name="bookTitle" id="bookTitle" value={bookTitle} onChange={(e) => this.handleChange(e, 'bookTitle')}></input>
              </div>
              <div className="book-modal-content__author">
                <label>Author</label>
                <input name="bookAuthor" id="bookAuthor" value={bookAuthor} onChange={(e) => this.handleChange(e, 'bookAuthor')}></input>
              </div>
              <div className="book-modal-content__rating">
                <label>Rating</label>
                <input name="bookRating" id="bookRating" value={bookRating} onChange={(e) => this.handleChange(e, 'bookRating')}></input>
              </div>
              <textarea value={bookDescription} onChange={(e) => this.handleChange(e, 'bookDescription')} className="book-modal-content__description" rows="7" cols="70" name="bookDescription" id="bookDescription"></textarea>
              <button type="submit">Submit</button>
            </div>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default BookDetail;
