import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';
import deleted from '../../images/delete.svg';

function MoviesCard(props) {
  const { pathname } = useLocation();

    // // Определяем, являемся ли мы владельцем текущей карточки
    // const isOwn = props.data.owner._id === currentUser._id;

    // // Создаём переменную, которую после зададим в `className` для кнопки удаления
    // const cardDeleteButtonClassName = (
    //   `${isOwn ? 'element__trash' : 'element__trash_hidden'}`
    // );

    // // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    // const isLiked = props.data.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    // const cardLikeButtonClassName = (
    //   `${isLiked ? 'card__like_type_active' : 'card__like'}`
    // );

  function likeActive(evt) {
    evt.target.classList.toggle('card__like_type_active');
  };

  return (
    <section className="cardBox">
      <li className="card">
        <div className="card__imgWrap">
          <img className="card__image"
            src={`https://api.nomoreparties.co${props.card.image.url}`} alt={props.card.nameRU} />
        </div>
        <div className="card__hdgWrap">
          <p className="card__name">{props.card.nameRU}</p>

          {pathname === '/movies' && (
            <button className="card__like" onClick={likeActive} type="button">
            </button>
          )}

          {pathname === "/saved-movies" && (
            <button className="card__deleted" type="button">
              <img src={deleted} alt="удалить фильм" />
            </button>
          )}

        </div>
        <p className="card__duration">{`${props.card.duration} мин`}</p>
      </li>
    </section>
  )
}

export default MoviesCard;