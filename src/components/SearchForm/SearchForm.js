import React from "react";
import { useFormWithValidation } from "../../utils/Validate";
import './SearchForm.css';
import * as moviesApi from "../../utils/MoviesApi";

function SearchForm(props) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  React.useEffect(() => {
    resetForm({});
  }, [resetForm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      moviesApi.getFilms()
        .then((res) => {
          props.handleOriginalCards(res);
          props.handleSearchQuery(values.search);
          props.handleProcessedCards(res, values.search);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSearchSubmit} noValidate>
        <input className="search__input" type="text" name="search" placeholder="Фильм"
          value={values.search} defaultValue={props.searchQuery} onChange={handleChange} required />
        <button className="search__button" title="Нажмите чтобы отправить запрос"
          type="submit" disabled={!isValid} />
      </form>
      <span className="search__input-error">{errors.search}</span>
      <label className="toggle">
        <input className="toggle__invisible-input" type="checkbox"
        name="checkbox" id="checkbox" onChange={props.handleIsShorts} checked={props.isShorts} />
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