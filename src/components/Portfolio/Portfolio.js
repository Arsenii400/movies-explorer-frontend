import React from "react";
import './Portfolio.css';
import arrow from '../../images/arrow.svg';
import { HOW_TO_LEARN_URL, RUSSIAN_TRAVEL_URL, MESTO_URL } from '../../utils/constants';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" href={HOW_TO_LEARN_URL}
          target="_blank" rel="noopener noreferrer">Статичный сайт
            <img className="portfolio__arrow" src={arrow} alt="arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href={RUSSIAN_TRAVEL_URL}
          target="_blank" rel="noopener noreferrer">Адаптивный сайт
            <img className="portfolio__arrow" src={arrow} alt="arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href={MESTO_URL}
          target="_blank" rel="noopener noreferrer">Одностраничное приложение
            <img className="portfolio__arrow" src={arrow} alt="arrow" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;