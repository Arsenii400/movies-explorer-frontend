import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../utils/Validate";
// import * as auth from '../../utils/Auth';

function Login(props) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  // const history = useHistory();
  // const [isServerError, setIsServerError] = useState("");

  React.useEffect(() => {
    resetForm({});
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = values;
    props.handleLoginSubmit({ email, password });
  }

  return (
    <main className="login">
      <div className="login__wrapper">
        <Link to="/" title="Главная страница">
          <img className="login__logo" src={logo} alt="logo" />
        </Link>
        <p className="login__hello">Рады видеть!</p>
      </div>
      <form className="login__form" onSubmit={handleSubmit} noValidate>

        <label className="login__label" htmlFor="email">E-mail</label>
        <input className="login__input" id="email" name="email" type="email"
          value={values.email} onChange={handleChange} required />
        <span className="login__input-error">{errors.email}</span>

        <label className="login__label" htmlFor="password">Пароль</label>
        <input className="login__input" id="password" name="password"
          type="password" minLength="4" maxLength="15"
          value={values.password} onChange={handleChange} required />
        <span className="login__input-error">{errors.password}</span>

        <div className="login__buttonWrap">
          <span className="login__input-error">{props.isServerError}</span>
          <button className="login__button" type="submit" disabled={!isValid}>Войти</button>
        </div>
      </form>
      <div className="login__linkWrap">
        <p className="login__text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__link">Регистрация</Link>
      </div>
    </main>
  )
}

export default Login;