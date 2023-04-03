import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css';

export const Searchbar = ({ searchHandler }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const inputHandler = ({ target }) => {
    setSearchQuery(target.value);
  };

  const searchSubmit = e => {
    e.preventDefault();

    searchHandler(searchQuery);

    resetSearch();
  };

  const resetSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={searchSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <AiOutlineSearch className={css.searchFormButtonLabel} />
        </button>
        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={inputHandler}
          value={searchQuery}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
};
