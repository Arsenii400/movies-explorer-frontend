import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс Практикум x BeatFilm.</p>
      <div className="footer__wrapper">
        <p className="footer__year">&copy; 2022</p>
        <div className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/web/">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/">Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

