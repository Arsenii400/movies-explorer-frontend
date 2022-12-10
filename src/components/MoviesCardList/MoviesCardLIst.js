import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
// import initialCards from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  const [films, setFilms] = useState(props.cards);

  useEffect(() => {
    if (props.isShorts) {
      setFilms(props.cards.filter((card) => {
        return card.duration < 40
      })
      )
    } else {
      return setFilms(props.cards);
    }
  }, [props.isShorts, props.cards])

  return (
    <section className="moviesCardList">
      <ul className="moviesList">
        {films.map((card) => (
          <MoviesCard key={card.id} card={card}  />
        ))}
      </ul>
      <div className="moviesCardList__wrapper">
        <button className="moviesCardList__more" type="button">Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList;