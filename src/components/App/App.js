import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../styles/App.css';
const Header = lazy(() => import('../Header/Header'));
const Landing = lazy(() => import('../Landing/Landing'));
const BookDetail = lazy(() => import('../BookDetail/BookDetail'));
const Login = lazy(() => import('../Login/Login'));

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      bookDetails: {}
    }
  }
  
  getBooks = (books) => {
    this.setState({books: books});
  }

  getBookDetails = (details) => {
    this.setState({ bookDetails: details });
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

    const LoginPage = (props) => {
      return (
        <Login 
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
              <Route exact path="/login" render={LoginPage} />
            </Switch>
          </Suspense>
        </Router>
      </main>
    );
  }
}

export default App;
