import React, { useState } from "react";
import './Register.css';
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../utils/Validate";
import * as auth from '../../utils/Auth';

function Register(props) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  // const history = useHistory();
  const [isServerError, setIsServerError] = useState("");

  React.useEffect(() => {
    resetForm({});
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password } = values;
    auth.register({ name, email, password }).then((res) => {
      if(res){
        props.handleLoginSubmit({ email, password });
        // history.push('/signin');;
      } else {
        setIsServerError(res.message);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <main className="register">
      <div className="register__wrapper">
        <Link to="/" title="Главная страница">
          <img className="register__logo" src={logo} alt="logo" />
        </Link>
        <p className="register__hello">Добро пожаловать!</p>
      </div>
      <form className="register__form" onSubmit={handleSubmit} noValidate>

        <label className="register__label" htmlFor="name">Имя</label>
        <input className="register__input" id="name" name="name" type="text"
        value={values.name} onChange={handleChange} minLength="2" maxLength="30" required />
        <span className="register__input-error">{errors.name}</span>

        <label className="register__label" htmlFor="email">E-mail</label>
        <input className="register__input" id="email" name="email" type="email"
        value={values.email} onChange={handleChange} required />
        <span className="register__input-error">{errors.email}</span>

        <label className="register__label" htmlFor="password">Пароль</label>
        <input className="register__input" id="password" name="password" type="password"
        value={values.password} onChange={handleChange} minLength="4" maxLength="15" required />
        <span className="register__input-error">{errors.password}</span>

        <div className="register__buttonWrap">
        <span className="register__input-error">{isServerError}</span>
        <button className="register__button" type="submit" disabled={!isValid} >Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__linkWrap">
        <p className="register__text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__link">Войти</Link>
      </div>
    </main>
  )
}

export default Register;