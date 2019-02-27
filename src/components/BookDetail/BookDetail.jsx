import React, { Component } from 'react';
import Modal from 'react-modal';
import Airtable from 'airtable';
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
      bookDescription: '',
      bookId: '',
      originalState: {}
    }
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
        bookId: bookDetails.id,
        originalState: bookDetails
      });
    } else {
      this.setState({
        bookTitle: bookDetails.title,
        bookAuthor: bookDetails.author,
        bookRating: bookDetails.rating,
        bookImage: bookDetails.image,
        bookDescription: bookDetails.description,
        bookId: bookDetails.id,
        originalState: bookDetails
      });
    }
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      bookTitle: this.state.originalState.title,
      bookAuthor: this.state.originalState.author,
      bookRating: this.state.originalState.rating,
      bookDescription: this.state.originalState.description
    });
  }
  
  handleChange = (e, state) => {
    this.setState({
      [state]: e.target.value 
    })
  }

  handleSubmit = (bookId, bookTitle, bookAuthor, bookRating, bookDescription) => {
    var base = new Airtable({apiKey: 'key7D0jCBOHkuAmkv'}).base('appNcFuYsJ1L69Jt2');
    
    base('Table 1').update(`${bookId}`, {
      "title": `${bookTitle}`,
      "image": "https://images.gr-assets.com/books/1520620414l/26032887.jpg",
      "rating": `${bookRating}`,
      "description": `${bookDescription}`,
      "author": `${bookAuthor}`
    }, function(err, record) {
      if (err) { console.error(err); return; }
      console.log(record.get('id'));
    });

    this.setState({ modalIsOpen: false });
  }

  render() {
    const { bookTitle, bookAuthor, bookRating, bookImage, bookDescription, bookId } = this.state;

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
            <button onClick={() => {this.handleSubmit(bookId, bookTitle, bookAuthor, bookRating, bookDescription)}}>Submit</button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default BookDetail;
