import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';
// import like from '../../images/like.svg';
// import likective from '../../images/like-active.svg';
import deleted from '../../images/delete.svg';

function MoviesCard(props) {
  const { pathname } = useLocation();

  function likeActive(evt) {
    evt.target.classList.toggle('card__like_type_active');
  };

  return (
    <section className="cardBox">
      <li className="card">
        <div className="card__imgWrap">
          <img className="card__image" src={props.data.link} alt={props.data.name} />
        </div>
        <div className="card__hdgWrap">
          <p className="card__name">{props.data.name}</p>

          {pathname === '/movies' && (
            <button className="card__like" onClick={likeActive} type="button">
              {/* <img src={like} alt="лайк" /> */}
            </button>
          )}

          {pathname === "/saved-movies" && (
            <button className="card__deleted" type="button">
              <img src={deleted} alt="удалить фильм" />
            </button>
          )}

        </div>
        <p className="card__duration">{props.data.duration}</p>
      </li>
    </section>
  )
}

export default MoviesCard;