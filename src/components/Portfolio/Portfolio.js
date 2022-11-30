import React from "react";
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/Arsenii400/how-to-learn">Статичный сайт
            <img className="portfolio__arrow" src={arrow} alt="arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/Arsenii400/russian-travel">Адаптивный сайт
            <img className="portfolio__arrow" src={arrow} alt="arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/Arsenii400/react-mesto-api-full">Одностраничное приложение
            <img className="portfolio__arrow" src={arrow} alt="arrow" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;