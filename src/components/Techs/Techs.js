import React from "react";
import './Techs.css';

function Techs() {
  return (
    <section className="tech">
      <h2 className="tech__title">Технологии</h2>
      <p className="tech__header">7 технологий</p>
      <p className="tech__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="tech__technologies">
        <p className="tech__technology">HTML</p>
        <p className="tech__technology">CSS</p>
        <p className="tech__technology">JS</p>
        <p className="tech__technology">React</p>
        <p className="tech__technology">Git</p>
        <p className="tech__technology">Express.js</p>
        <p className="tech__technology">mongoDB</p>
      </div>
    </section>
  );
}

export default Techs;