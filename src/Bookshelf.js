import React from 'react';
import { useEffect }from 'react'
import Book from './Book'

const Bookshelf = ( {books, title, setShowSearchpage, handleBookshelfChangeShelf} ) => {

  useEffect(() => {
    setShowSearchpage(true);  
  }, [setShowSearchpage]);

  return (
    <div>
        <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
        {books && books.length > 0 ? (
        <ol className="books-grid">
            { books.map((book, index) => (
            <Book
              key={index}
              id={book.id}
              title={book.title}
              authors={book.authors}
              image={book.imageLinks.thumbnail}
              book={book}
              shelf={book.shelf}
              handleChangeShelf={handleBookshelfChangeShelf}
            />
            ))}
        </ol>) : ("")}
        </div>
        </div>
    </div>
  );
};

export default Bookshelf;