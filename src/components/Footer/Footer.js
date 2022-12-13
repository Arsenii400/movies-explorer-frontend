import React from "react";
import './Footer.css';
import { YA_PRAKTIKUM_URL, GITHUB_URL } from '../../utils/constants';


function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс Практикум x BeatFilm.</p>
      <div className="footer__wrapper">
        <p className="footer__year">&copy; 2022</p>
        <div className="footer__links">
          <a className="footer__link" href={YA_PRAKTIKUM_URL}>Яндекс.Практикум</a>
          <a className="footer__link" href={GITHUB_URL}>Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

