import React, { Component, Suspense, lazy } from 'react';
import '../../styles/Landing.css';
const Book = lazy(() => import('../Book/Book'));
const Sidebar = lazy(() => import('../Sidebar/Sidebar'));

class Landing extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      books: []
    }
  }

  fetchBooks = async () => {
    console.log("Getting Data");
    
    const response = await fetch(
      'https://api.airtable.com/v0/appNcFuYsJ1L69Jt2/Table%201',
      {
        headers: {
          'Authorization': 'Bearer key7D0jCBOHkuAmkv'
        }
      }
    );
    const { records } = await response.json();
    this.setState({ books: records });
  }
  
  componentDidMount() {
    this.fetchBooks();
  }

  compare = (type) => {
    return (a, b) => {
      switch (type) {
        case 'aToZ' :
          if (a.fields.title < b.fields.title) {
            return -1;
          } 
          if (a.fields.title > b.fields.title) {
            return 1;
          }
          break;
        case 'zToA' :
          if (a.fields.title < b.fields.title) {
            return 1;
          } 
          if (a.fields.title > b.fields.title) {
            return -1;
          }
          break;
        case 'ratingASC' :
          if (a.fields.rating < b.fields.rating) {
            return -1;
          }
          if (a.fields.rating > b.fields.rating) {
            return 1;
          }
          break;
        case 'ratingDESC' :
          if (a.fields.rating < b.fields.rating) {
            return 1;
          }
          if (a.fields.rating > b.fields.rating) {
            return -1;
          }
          break;
        default:
          return 0;
      }
    }
  }

  getSortType = (type) => {
    const { books } = this.state;
    
    let promise1 = new Promise( (resolve, reject) => {
      if (Object.entries(books).length !== 0) {
        resolve("Data Available!");
      }

      if (Object.entries(books).length === 0) {
        reject("Data not Available!");
      }
    });

    promise1.then((message) => {
      console.log(message);
      books.sort(this.compare(type));
      this.setState({books: books});
    }).catch((message) => {
      console.log(message);
    });
  }

  render () {
    const { url } = this.props.match;
    const { sendData } = this.props;
    const { books } = this.state;
    
    const bookArr = books.map(
      (elem, index) => <Book key={index} url={url} id={elem.id} details={elem.fields} sendData={sendData}/> 
    );

    return(
    <React.Fragment>
      <div className="landing-header">
        Books
      </div>
      <section className="landing-section">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="books-landing">
            {bookArr}
          </div>
          <Sidebar sendSortType={this.getSortType}/>
        </Suspense> 
      </section>
    </React.Fragment>
    );
  }
}

export default Landing;