import React from 'react';
import "./App.css";
import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI"
import SearchPage from "./SearchPage";
import Bookshelf from "./Bookshelf";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [booksToChange, setBookToChangeShelf] = useState([]);


  const handleSearchChangeShelf = (book, shelf) => {
//    console.log("handle change self in search page for book: ", book, shelf);
    let bookToChangeShelf = book;
    BooksAPI.update(bookToChangeShelf, shelf).then(() => {
      bookToChangeShelf.shelf = shelf;
      let newBooks = books.filter(book => book.id !== bookToChangeShelf.id)
      newBooks.push(bookToChangeShelf);
      setBooks(newBooks);
      setBookToChangeShelf(books);
    })
  };

  const handleBookshelfChangeShelf = (book, shelf) => {
//    console.log("handle change self in home page for book: ", book, shelf);
    let bookToChangeShelf = book;
    BooksAPI.update(bookToChangeShelf, shelf).then(() => {
      bookToChangeShelf.shelf = shelf;
      let newBooks = books.filter(book => book.id !== bookToChangeShelf.id)
      newBooks.push(bookToChangeShelf);
      setBooks(newBooks);
      setBookToChangeShelf(books);
    })
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
      </div>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
            <Bookshelf 
              title="Currently Reading"
              books={books.filter(book => book.shelf === "currentlyReading")}
              booksToChange={booksToChange} 
              setShowSearchpage={setShowSearchpage}
              handleBookshelfChangeShelf={handleBookshelfChangeShelf}
            />
            <Bookshelf 
              title="Want to Read"
              books={books.filter(book => book.shelf === "wantToRead")}
              booksToChange={booksToChange} 
              setShowSearchpage={setShowSearchpage}
              handleBookshelfChangeShelf={handleBookshelfChangeShelf}
            />
            <Bookshelf 
              title="Read"
              books={books.filter(book => book.shelf === "read")}
              booksToChange={booksToChange} 
              setShowSearchpage={setShowSearchpage}
              handleBookshelfChangeShelf={handleBookshelfChangeShelf}
            />
            </>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <SearchPage handleSearchChangeShelf={handleSearchChangeShelf} setShowSearchpage={setShowSearchpage} />
          }
        />
      </Routes>
      {showSearchPage ? (
        <Link to="/search" className="open-search">
          Add a book
        </Link>        
      ): null}
    </div>
  );
}

export default App;
