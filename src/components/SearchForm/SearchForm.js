import React from "react";
import { useFormWithValidation } from "../../utils/Validate";
import './SearchForm.css';

function SearchForm() {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const handleSubmit = () => {

  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <input className="search__input" type="text" name="search" placeholder="Фильм"
          value={values} onChange={handleChange} required />
        <button className="search__button" type="submit" disabled={!isValid} />
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