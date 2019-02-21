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

    this.getSortType = this.getSortType.bind(this);
    console.log("App constructor");
  }

  compare = (type) => {
    return (a, b) => {
      switch (type) {
        case 'aToZ' :
          if (a.title < b.title) {
            return -1;
          } 
          if (a.title > b.title) {
            return 1;
          }
          break;
        case 'zToA' :
          if (a.title < b.title) {
            return 1;
          } 
          if (a.title > b.title) {
            return -1;
          }
          break;
        case 'ratingASC' :
          if (a.rating < b.rating) {
            return -1;
          }
          if (a.rating > b.rating) {
            return 1;
          }
          break;
        case 'ratingDESC' :
          if (a.rating < b.rating) {
            return 1;
          }
          if (a.rating > b.rating) {
            return -1;
          }
          break;
        default:
          return 0;
      }
    }
  }
  

  getSortType(type) {
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

  getBookDetails = (details) => {
    this.setState({ bookDetails: details });
  }

  fetchBooks = async () => {
    console.log("Getting Data");
    const books = [];
    
    var base = new Airtable({apiKey: 'key7D0jCBOHkuAmkv'}).base('appNcFuYsJ1L69Jt2');
    base('Table 1').select({
      maxRecords: 10,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        let obj = record.fields;
        // obj[`id`] = record.id;
        books.push(obj);
      });
      
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
      
    }, function done(err) {
      if (err) { console.error(err); return; }
    });

    console.log("App books:", books.length);
    books.forEach((elem) => {
      console.log(elem);
    });
    await this.setState({ books: books });
  }
  
  componentDidMount() {
    this.fetchBooks();
  }  

  componentDidUpdate = (prevProps, prevState) => {
    console.log("App CDU", this.state.books.length);
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
          sendSortType={this.getSortType}
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
