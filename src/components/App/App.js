import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Airtable from 'airtable';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import BookDetail from '../BookDetail/BookDetail';
import '../../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      bookDetails: {}
    }
  }

  // compare = (type) => {
  //   return (a, b) => {
  //     switch (type) {
  //       case 'aToZ' :
  //         if (a.fields.title < b.fields.title) {
  //           return -1;
  //         } 
  //         if (a.fields.title > b.fields.title) {
  //           return 1;
  //         }
  //         break;
  //       case 'zToA' :
  //         if (a.fields.title < b.fields.title) {
  //           return 1;
  //         } 
  //         if (a.fields.title > b.fields.title) {
  //           return -1;
  //         }
  //         break;
  //       case 'ratingASC' :
  //         if (a.fields.rating < b.fields.rating) {
  //           return -1;
  //         }
  //         if (a.fields.rating > b.fields.rating) {
  //           return 1;
  //         }
  //         break;
  //       case 'ratingDESC' :
  //         if (a.fields.rating < b.fields.rating) {
  //           return 1;
  //         }
  //         if (a.fields.rating > b.fields.rating) {
  //           return -1;
  //         }
  //         break;
  //       default:
  //         return 0;
  //     }
  //   }
  // }
  
  getBooks = (books) => {
    this.setState({books: books});
  }

  // getSortType = (type) => {
  //   const { books } = this.state;
    
  //   let promise1 = new Promise( (resolve, reject) => {
  //     if (Object.entries(books).length !== 0) {
  //       resolve("Data Available!");
  //     }

  //     if (Object.entries(books).length === 0) {
  //       reject("Data not Available!");
  //     }
  //   });

  //   promise1.then((message) => {
  //     console.log(message);
  //     books.sort(this.compare(type));
  //     this.setState({books: books});
  //   }).catch((message) => {
  //     console.log(message);
  //   });
  // }

  getBookDetails = (details) => {
    this.setState({ bookDetails: details });
  }

  // fetchBooks = async () => {
  //   console.log("Getting Data");
    
  //   const response = await fetch(
  //     'https://api.airtable.com/v0/appNcFuYsJ1L69Jt2/Table%201',
  //     {
  //       headers: {
  //         'Authorization': 'Bearer key7D0jCBOHkuAmkv'
  //       }
  //     }
  //   );
  //   const { records } = await response.json();
  //   this.setState({ books: records });
  // }
  
  componentDidMount() {
    // this.fetchBooks();
  }  
  
  render() {
    const Home = (props) => {
      return (
        <h1>Home Page</h1>
      );
    }

    const BookProfile = (props) => {
      return (
        <BookDetail 
          bookDetails={this.state.bookDetails}
          {...props}
        />
      );
    }

    const BooksLanding = (props) => {
      return (
        <Landing 
          sendData={this.getBookDetails}
          books={this.state.books}
          {...props}
        />
      );
    }

    return (
      <main>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Switch>
              <Route exact path="/" render={Home}/>
              <Route exact path="/books/:bookTitle" render={BookProfile}/>
              <Route path="/books" render={BooksLanding} />
            </Switch>
          </Suspense>
        </Router>
      </main>
    );
  }
}

export default App;
