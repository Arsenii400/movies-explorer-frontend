import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";

function Login() {
  return (
    <main className="login">
      <div className="login__wrapper">
        <Link exact to="/" title="Главная страница">
          <img className="login__logo" src={logo} alt="logo" />
        </Link>
        <p className="login__hello">Рады видеть!</p>
      </div>
      <form className="login__form">
        <label className="login__label" for="email">E-mail</label>
        <input className="login__input" id="email" type="email" required />
        <span className="login__input-error" />
        <label className="login__label" for="password">Пароль</label>
        <input className="login__input" id="password" type="password" minLength="2" maxLength="12" required />
        <span className="login__input-error" />
        <button className="login__button" type="submit">Войти</button>
      </form>
      <div className="login__linkWrap">
        <p className="login__text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__link">Регистрация</Link>
      </div>
    </main>
  )
}

export default Login;