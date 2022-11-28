import React from "react";
import './AboutMe.css';
import user from '../../images/student.jpg'

function AboutMe() {
  return (
    <section className="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>
      <p className="aboutMe__name">Арсений</p>
      <p className="aboutMe__job">Фронтенд-разработчик, 30 лет</p>
      <p className="aboutMe__story">Я родился в Перми и живу в Питере. Закончил судоводительский факультет ГУМРФ.
        Люблю кататься на коньках и велосипеде. Недавно начал кодить. До этого ходил в море.
        После того как прошёл курс по веб-разработке, начал искать работу в разработке веб-приложений.
      </p>
      <a className="aboutMe__link" href="https://github.com/Arsenii400">Github</a>
      <img className="aboutMe__photo" src={user} alt="student" />
    </section>
  );
};

export default AboutMe;