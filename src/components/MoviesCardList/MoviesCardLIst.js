import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const { pathname } = useLocation();

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

  useEffect(() => {
    if (props.savedSearchQuery) {
      setFilms(props.cards.filter((card) => {
        return card.nameRU.toLowerCase().includes(props.savedSearchQuery.trim().toLowerCase());
      }))
    } else {
      return setFilms(props.cards);
    }
  }, [props.savedSearchQuery, props.cards])

  const reportInitialWindowSize = () => {
    if (window.screen.width > 1087) {
      return { count: 12, more: 3 };
    } else if (window.screen.width > 689) {
      return { count: 8, more: 2 };
    } else {
      return { count: 5, more: 2 };
    }
  }

  const [lastIndex, setLastIndex] = useState(reportInitialWindowSize().count);
  const [countPerRow, setCountPerRow] = useState(reportInitialWindowSize().more);

  const reportWindowSize = () => {
    if (window.innerWidth > 1087) {
      setLastIndex(12);
      setCountPerRow(3);
    } else if (window.innerWidth > 689) {
      setLastIndex(8);
      setCountPerRow(2);
    } else {
      setLastIndex(5);
      setCountPerRow(2);
    }
  }

  window.onresize = reportWindowSize;

  const ShowMore = () => {
    if (films.length >= lastIndex) {
      setLastIndex(lastIndex + countPerRow);
    } else {
      console.log("Больше нечего отображать");
    }
  }

  return (
    <section className="moviesCardList">
      {pathname === '/movies' && (
        <ul className="moviesList">
          {films.slice(0, lastIndex).map((card) => (
            <MoviesCard
              key={card.id}
              card={card}
              savedCards={props.savedCards}
              setSavedCards={props.setSavedCards}
              handleSavedCards={props.handleSavedCards}
              isLiked={props.savedCards.some((item) =>
                item.nameRU.toLowerCase() === card.nameRU.toLowerCase())}
            />
          ))}
        </ul>
      )}

      {pathname === '/saved-movies' && (
        <ul className="moviesList">
          {films.slice(0, lastIndex).map((card) => (
            <MoviesCard
              key={card._id}
              card={card}
              savedCards={props.cards}
              setSavedCards={props.setSavedCards}
              setShortSavedCards={props.setShortSavedCards}
            />
          ))}
        </ul>
      )}

      <p className="moviesCardList__nothing" hidden={films.length > 0}>«Ничего не найдено»</p>

      <div className="moviesCardList__wrapper">
        <button className="moviesCardList__more" type="button" onClick={ShowMore}
          hidden={films.length <= lastIndex}>Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList;