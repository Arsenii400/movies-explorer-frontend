import React from "react";
import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input className="search__input" type="text" placeholder="Фильм" />
        <button className="search__button" />
      </form>
      <label className="toggle">
        <input className="toggle__invisible-input" type="checkbox" />
        <span className="toggle__track">
          <span className="toggle__indicator">
          </span>
        </span>
        <span className="toggle__text">
          Короткометражки
        </span>
      </label>
      <div className="search__bottomLine">
      </div>
    </section>
  )
}

export default SearchForm;