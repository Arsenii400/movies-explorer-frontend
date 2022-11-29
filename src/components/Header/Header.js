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

            <input className="burger burger__checkbox" type="checkbox" id="burger" />
            <label className="burger burger__label" for="burger" />

            <div className="burger__menu">
              <nav className="burger__nav">
                <ul className="burger__list">
                  <li className="burger__item">
                    <Link exact to="/" className="burger__link" title="Главная страница">Главная</Link>
                  </li>
                  <li className="burger__item">
                    <NavLink to="/movies" activeClassName="burger__navigation_active" className="burger__link">Фильмы</NavLink>
                  </li>
                  <li className="burger__item">
                    <NavLink to="/saved-movies" activeClassName="burger__navigation_active" className="burger__link">Сохранённые фильмы</NavLink>
                  </li>
                  <li className="burger__item">
                    <Link to="/profile" className="burger__account" title="Ссылка на страницу профиль пользователя">
                      <p className="burger__account burger__account_type_text">Аккаунт</p>
                      <div className="burger__account burger__account_type_photo">
                        <img src={icon} alt="пиктограмка пользователя" />
                      </div>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <nav className="header__navigation">
              <ul className="nav__list">
                <li className="nav__item">
                  <Link exact to="/" className="nav__link nav__link_type_logo" title="Главная страница">
                    <img className="nav__logo" src={logo} alt="#" />
                  </Link>
                </li>
                <li className="nav__item">
                  <ul className="nav__sub-items">
                    <li className="nav__sub-item">
                      <NavLink to="/movies" activeClassName="nav__navigation_active" className="nav__navLink"
                        title="Выбери киношку">
                        Фильмы
                      </NavLink>
                    </li>
                    <li className="nav__sub-item">
                      <NavLink to="/saved-movies" activeClassName="nav__navigation_active" className="nav__navLink"
                        title="Вспомни что понравилось">
                        Сохранённые фильмы
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav__item">
                  <Link to="/profile" className="nav__account" title="Ссылка на страницу профиль пользователя">
                    <p className="nav__account nav__account_type_text">Аккаунт</p>
                    <div className="nav__account nav__account_type_photo">
                      <img src={icon} alt="пиктограмка пользователя" />
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>

          </header>
        )
      }

      {pathname === "/" &&
        (
          <header className="header header_color_green">
            <Link exact to="/" className="header__link header__link_type_logo" title="Главная страница">
              <img className="header__logo" src={logo} alt="logo" />
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