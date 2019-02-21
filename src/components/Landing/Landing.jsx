import React, { Component, Suspense, lazy } from 'react';
import QueryString from 'query-string';
import '../../styles/Landing.css';
import Book from '../Book/Book';
// const Book = lazy(() => import('../Book/Book'));
const Sidebar = lazy(() => import('../Sidebar/Sidebar'));

class Landing extends Component {
 
  constructor(props) {
    super(props);

    console.log("Landing constructor");
  }

  componentDidUpdate = (prevProps, prevState) => {
    // const { querySort } = QueryString.parse(this.props.location.search);
    // const prevQuerySort = QueryString.parse(prevProps.location.search).querySort;
    // if (prevQuerySort !== querySort) {
    //   this.props.sendSortType(querySort);
    // }
  }

  render () {
    const { url } = this.props.match;
    const { sendData, books, sendSortType } = this.props;
    const bookArr = books.map(
      (elem, index) => <Book key={index} url={url} details={elem} sendData={sendData}/> 
      );
    console.log("Landing Render", books);

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
          <Sidebar sendSortType={sendSortType}/>
        </Suspense> 
      </section>
    </React.Fragment>
    );
  }
}

export default Landing;