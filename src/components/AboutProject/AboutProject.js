import React from "react";
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="aboutProject">
      <h2 className="aboutProject__title">О проекте</h2>
      <div className="aboutProject__stages">
        <p className="aboutProject__headers">
          Дипломный проект включал 5 этапов
        </p>
        <p className="aboutProject__text">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
        </p>
      </div>
      <div className="aboutProject__weeks">
        <p className="aboutProject__headers">
          На выполнение диплома ушло 5 недель
        </p>
        <p className="aboutProject__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="aboutProject__timeline">
        <div className="timeline__backend">
          <p className="timeline__time timeline__time_color_green">1 неделя</p>
          <p className="timeline__title">Back-end</p>
        </div>
        <div className="timeline__frontend">
          <p className="timeline__time timeline__time_color_grey">4 недели</p>
          <p className="timeline__title">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;