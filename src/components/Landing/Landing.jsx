import React, { Component, Suspense, lazy } from 'react';
import QueryString from 'query-string';
import '../../styles/Landing.css';
import Book from '../Book/Book';
// const Book = lazy(() => import('../Book/Book'));
const Sidebar = lazy(() => import('../Sidebar/Sidebar'));

class Landing extends Component {
 
  constructor(props) {
    super(props);
  }

  render () {
    const { url } = this.props.match;
    const { sendData, books, sendSortType } = this.props;
    
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
          <Sidebar sendSortType={sendSortType}/>
        </Suspense> 
      </section>
    </React.Fragment>
    );
  }
}

export default Landing;