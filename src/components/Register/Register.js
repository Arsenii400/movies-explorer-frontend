import React from "react";
import './Register.css';
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Register() {
  return (
    <section className="register">
      <div className="register__wrapper">
        <img className="register__logo" src={logo} alt="logo" />
        <p className="register__hello">Добро пожаловать!</p>
      </div>
      <form className="register__form">
        <label className="register__label" for="name">Имя</label>
        <input className="register__input" id="name" type="text" />
        <span className="register__input-error" />
        <label className="register__label" for="email">E-mail</label>
        <input className="register__input" id="email" type="email" />
        <span className="register__input-error" />
        <label className="register__label" for="password">Пароль</label>
        <input className="register__input" id="password" type="password" />
        <span className="register__input-error" />
        <button className="register__button" type="button">Зарегистрироваться</button>
      </form>
      <div className="register__linkWrap">
        <p className="register__text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__link">Войти</Link>
      </div>
    </section>
  )
}

export default Register;