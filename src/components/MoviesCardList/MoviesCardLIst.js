import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { DURATION, BIGWINSIZE, MEDIUMWINSIZE,
BIGCOUNT, MEDIUMCOUNT, SMALLCOUNT, BIGMORE, SMALLMORE } from "../../utils/constants";

function MoviesCardList(props) {
  const { pathname } = useLocation();

  const [films, setFilms] = useState(props.cards);

  useEffect(() => {
    if (props.isShorts) {
      if (props.isSavedSearched) {
        setFilms(props.cards.filter((card) => {
          return card.duration < DURATION && card.nameRU.toLowerCase().includes(props.savedSearchQuery.trim().toLowerCase());
        }))
        props.setIsSavedSearched(false);
      } else {
        setFilms(props.cards.filter((card) => {
          return card.duration < DURATION
        })
        )
      }
    } else {
      if (props.isSavedSearched) {
        setFilms(props.cards.filter((card) => {
          return card.nameRU.toLowerCase().includes(props.savedSearchQuery.trim().toLowerCase());
        }))
        props.setIsSavedSearched(false);
      } else {
        return setFilms(props.cards);
      }
    }

  }, [props.savedSearchQuery, props.isShorts, props.cards])

  const reportInitialWindowSize = () => {
    if (window.screen.width > BIGWINSIZE) {
      return { count: BIGCOUNT, more: BIGMORE };
    } else if (window.screen.width > MEDIUMWINSIZE) {
      return { count: MEDIUMCOUNT, more: SMALLMORE };
    } else {
      return { count: SMALLCOUNT, more: SMALLMORE };
    }
  }

  const [lastIndex, setLastIndex] = useState(reportInitialWindowSize().count);
  const [countPerRow, setCountPerRow] = useState(reportInitialWindowSize().more);

  const reportWindowSize = () => {
    if (window.innerWidth > BIGWINSIZE) {
      setLastIndex(BIGCOUNT);
      setCountPerRow(BIGMORE);
    } else if (window.innerWidth > MEDIUMWINSIZE) {
      setLastIndex(MEDIUMCOUNT);
      setCountPerRow(SMALLMORE);
    } else {
      setLastIndex(SMALLCOUNT);
      setCountPerRow(SMALLMORE);
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
            />
          ))}
        </ul>
      )}

      {props.isSearched && <p className="moviesCardList__nothing" hidden={films.length > 0}>«Ничего не найдено»</p>}

      <div className="moviesCardList__wrapper">
        <button className="moviesCardList__more" type="button" onClick={ShowMore}
          hidden={films.length <= lastIndex}>Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList;