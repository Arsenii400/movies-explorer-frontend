import React from "react";
import { useFormWithValidation } from "../../utils/Validate";
import './SearchForm.css';
import * as moviesApi from "../../utils/MoviesApi";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const { pathname } = useLocation();
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  React.useEffect(() => {
    resetForm({});
  }, [resetForm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      props.setIsLoading(true);
      moviesApi.getFilms()
        .then((res) => {
          props.handleOriginalCards(res);
          props.handleSearchQuery(values.search);
          props.handleProcessedCards(res, values.search);
          props.setIsSearched(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          props.setIsLoading(false);
        })
    }
  }

  const handleSavedSearchSubmit = (e) => {
    e.preventDefault()
    props.handleSavedSearchQuery(values.search)
  }

  return (
    <section className="search">
      {(
        pathname === '/movies' &&
        <>
          <form className="search__form" onSubmit={handleSearchSubmit} noValidate>
            <input className="search__input" type="text" name="search" placeholder="Фильм"
              value={values.search} defaultValue={props.searchQuery} onChange={handleChange} required />
            <button className="search__button" title="Нажмите чтобы отправить запрос"
              type="submit" disabled={!isValid} />
          </form>
          <span className="search__input-error">{errors.search}</span>
          <label className="toggle">
            <input className="toggle__invisible-input" type="checkbox"
              name="checkbox" id="checkbox"
              onChange={props.handleIsShorts}
              checked={props.isShorts}
            />
            <span className="toggle__track">
              <span className="toggle__indicator">
              </span>
            </span>
            <span className="toggle__text">
              Короткометражки
            </span>
          </label>
        </>
      )}
      {(
        pathname === '/saved-movies' &&
        <>
          <form className="search__form" onSubmit={handleSavedSearchSubmit} noValidate>
            <input className="search__input" type="text" name="search" placeholder="Фильм"
              value={values.search} onChange={handleChange} required />
            <button className="search__button" title="Нажмите чтобы отправить запрос"
              type="submit" disabled={!isValid} />
          </form>
          <span className="search__input-error">{errors.search}</span>
          <label className="toggle">
            <input className="toggle__invisible-input" type="checkbox"
              name="checkbox" id="checkbox"
              onChange={props.handleIsSavedShorts}
              checked={props.isSavedShorts}
            />
            <span className="toggle__track">
              <span className="toggle__indicator">
              </span>
            </span>
            <span className="toggle__text">
              Короткометражки
            </span>
          </label>
        </>
      )}

      <div className="search__bottomLine">
      </div>
    </section>
  )
}

export default SearchForm;