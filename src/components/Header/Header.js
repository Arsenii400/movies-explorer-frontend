import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import icon from '../../images/icon.svg';

function Header() {
  const { pathname } = useLocation();

  return (
    <>
      {(pathname === ("/movies") || pathname === ("/saved-movies") || pathname === ("/profile")) &&
        (
          <header className="header header_color_white">
            <Link exact to="/" className="header__link header__link_type_logo" title="Главная страница">
              <img className="header__logo" src={logo} alt="#" />
            </Link>

            <nav className="header__navigation">
              <NavLink to="/movies" activeClassName="header__navigation_active" className="header__navLink"
                title="Выбери киношку">Фильмы</NavLink>
              <NavLink to="/saved-movies" activeClassName="header__navigation_active" className="header__navLink"
                title="Вспомни что понравилось">Сохранённые фильмы</NavLink>
            </nav>

            <Link to="/profile" className="header__account" title="Ссылка на страницу профиль пользователя">
              <p className="header__account header__account_type_text">Аккаунт</p>
              <div className="header__account header__account_type_photo">
                <img src={icon} alt="пиктограмка пользователя" />
              </div>
            </Link>
          </header>
        )
      }

      {pathname === "/" &&
        (
          <header className="header header_color_green">
            <Link exact to="/" className="header__link header__link_type_logo" title="Главная страница">
              <img className="header__logo" src={logo} alt="#" />
            </Link>

            <div className="header__wrapper">
              <Link to="/signup" className="header__link header__link_type_register" title="Хочу зарегистрироваться">
                <p className="header__text header__text_type_register">Регистрация</p>
              </Link>
              <Link to="/signin" className="header__link header__link_type_login" title="Хоцу залогиниться">
                <p className="header__text header__text_type_login">Войти</p>
              </Link>
            </div>
          </header>
        )
      }
    </>
  );
}

export default Header;