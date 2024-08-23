import React from 'react';
import PropTypes from "prop-types";

const Book = ({book, handleChangeShelf}) => {
  const { id, title, authors, shelf} = book;

  return (
    <li key={id}>
      <div className="book">
      <div className="book-top">
      <div className="book-cover"
      style={{
          width: 128,
          height: 188,
          backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : "Image not avaliable"})`,
      }}
      >            
      </div>
      <div className="book-shelf-changer">
        <select
          onChange={(event) => handleChangeShelf(book, event.target.value)}
          defaultValue={shelf}
        >
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
      </div>
      <div className="book-title">{title}</div>
      {authors && authors.map((author, index) =>
        <div className="book-authors" key={index}> {author} </div>
      )}
    </div>
    </li>
  );
};

Book.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired
};

export default Book;