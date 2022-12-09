import React from "react";
import "./MoviesCardList.css";
// import initialCards from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {

  const cards = JSON.parse(localStorage.getItem('cards'));

  return (
    <section className="moviesCardList">
      <ul className="moviesList">
        {cards.map((card) => (
          <MoviesCard key={card.id} card={card} />
        ))}
      </ul>
      <div className="moviesCardList__wrapper">
        <button className="moviesCardList__more" type="button">Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList;