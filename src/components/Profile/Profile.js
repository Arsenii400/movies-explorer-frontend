import React from "react";
import Header from "../Header/Header";
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <Header />
      <h1 className="profile__header">
        Привет, Виталий!
      </h1>
      <div className="profile__string">
        <p className="profile__key">Имя</p>
        <p className="profile__text">Виталий</p>
      </div>
      <div className="profile__string">
        <p className="profile__key">E-mail</p>
        <p className="profile__text">pochta@yandex.ru</p>
      </div>
      <button className="profile__edit">Редактировать</button>
      <button className="profile__exit">Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;