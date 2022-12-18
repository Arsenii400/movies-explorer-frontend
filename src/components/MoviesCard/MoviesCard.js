import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';
import deleted from '../../images/delete.svg';
import * as mainApi from '../../utils/MainApi';
import { HOUR } from "../../utils/constants";

function MoviesCard(props) {
  const { pathname } = useLocation();

  function time(mins) {
    let hours = Math.trunc(mins / HOUR);
    let minutes = mins % HOUR;
    if (mins >= HOUR) {
      return hours + 'ч ' + minutes + 'м';
    } else {
      return minutes + 'м';
    }
  }

  const cardLikeButtonClassName = (
    `${props.isLiked ? 'card__like card__like_type_active' : 'card__like'}`
  );

  function likeActive() {
    if (!props.isLiked) {
      mainApi.saveMovies(props.card).then((res) => {
        if (res) {
          props.handleSavedCards(res.data);
        }
      })
    } else {
      const idFromSavedCard = props.savedCards.filter(item =>
        item.nameRU.toLowerCase() === props.card.nameRU.toLowerCase())
      console.log(idFromSavedCard[0]._id);

      mainApi.deleteMovies(idFromSavedCard[0]._id)
        .then(() => {
          console.log("фильм удалён");
          props.setSavedCards(props.savedCards.filter((oldcard) =>
            oldcard._id !== idFromSavedCard[0]._id));
        })
    }
  };

  function deleteSavedMovie() {
    const id = props.card._id;
    console.log(id);;

    mainApi.deleteMovies(id)
      .then(() => {
        console.log("фильм удалён");
        props.setSavedCards(props.savedCards.filter((oldcard) =>
          oldcard._id !== id))
      })
  }

  return (
    <section className="cardBox">
      <li className="card">
        <div className="card__imgWrap">
          <a className="card__link" href={props.card.trailerLink} target="_blank" rel="noopener noreferrer">
            <img className="card__image"
              src={pathname === '/movies' ?
                `https://api.nomoreparties.co${props.card.image.url}` :
                props.card.image} alt={props.card.nameRU} />
          </a>
        </div>
        <div className="card__hdgWrap">
          <p className="card__name">{props.card.nameRU}</p>

          {pathname === '/movies' && (
            <button className={cardLikeButtonClassName} onClick={likeActive} type="button">
            </button>
          )}

          {pathname === "/saved-movies" && (
            <button className="card__deleted" type="button" onClick={deleteSavedMovie}>
              <img src={deleted} alt="удалить фильм" />
            </button>
          )}

        </div>
        <p className="card__duration">{time(props.card.duration)}</p>
      </li>
    </section>
  )
}

export default MoviesCard;