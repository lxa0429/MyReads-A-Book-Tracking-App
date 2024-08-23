import React from 'react';
import { useState, useEffect } from "react";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI"
import { Link, useLocation } from "react-router-dom";


const SearchPage = ( {handleSearchChangeShelf, setShowSearchpage} ) => {
  
  let location = useLocation();

  useEffect(() => {
  
  if(location.pathname === "/search") {
    setShowSearchpage(false);
  }
  },[location.pathname, setShowSearchpage])

  const [query, setQuery] = useState("");
  const [booksFound, setBooksFound] = useState([]);

  const handleSearchBooks = event => {
    setQuery(event.target.value);
    if(query.length > 0) {
      BooksAPI.search(query).then(booksFound => {
        if(!booksFound.error) {
          setBooksFound(booksFound);     
        }
        else {          
          setBooksFound([]); 
        }
      })
    }
  }

  return (
    <div className="search-books">
    <div className="search-books-bar">
      <Link to="/" className="close-search">
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          value={query}
          onChange={ event =>handleSearchBooks(event) }
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
      {query.length > 0 && booksFound && booksFound.map((book, index) => (
        <Book
          key={index}
          id={book.id}
          title={book.title}
          authors={book.authors || []}
          image={book.imageLinks && book.imageLinks.thumbnail}
          book={book}
          shelf={book.shelf || 'none'}
          handleChangeShelf={handleSearchChangeShelf}
        />       
      ))}
      </ol>
    </div>
  </div>
  );
};

export default SearchPage;