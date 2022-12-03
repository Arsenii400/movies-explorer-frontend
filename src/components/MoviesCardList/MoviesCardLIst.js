import React from "react";
import "./MoviesCardList.css";
import initialCards from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="moviesCardList">
      <ul className="moviesList">
        {initialCards.map((card) => (
          <MoviesCard data={card} />
        ))}
      </ul>
      <div className="moviesCardList__wrapper">
        <button className="moviesCardList__more" type="button">Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList;