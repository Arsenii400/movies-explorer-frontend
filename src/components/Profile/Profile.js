import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../utils/Context";
import { useFormWithValidation } from "../../utils/Validate";
import Header from "../Header/Header";
import "./Profile.css";
import * as mainApi from '../../utils/MainApi';

function Profile(props) {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  const [isEqual, setIsEqual] = useState(false);

  useEffect(() => {
    const Equal = () => {
      if (currentUser.name === values.name && currentUser.email === values.email) {
        setIsEqual(true);
      } else {
        setIsEqual(false);
      }
    };
    Equal()
  }, [currentUser, values])

  React.useEffect(() => {
    resetForm({});
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email } = values;
    mainApi.updateProfile({ name, email }).then((res) => {
      if (res) {
        props.handleCurrentUser(res.data);
        props.handleOpenSuccessPopup();
        console.log(currentUser);
      }
    })
      .catch((err) => {
        props.handleOpenDeniedPopup();
        console.log(err);
      })
  }

  return (
    <>
      <Header />
      <main className="profile">
        <h1 className="profile__header">
          {`Привет, ${currentUser.name}!`}
        </h1>
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <div className="profile__string">
            <label className="profile__key" htmlFor="name">Имя</label>
            <input className="profile__text" id="name" name="name"
              type="text" minLength="2" maxLength="30" value={values.name}
              placeholder={currentUser.name} onChange={handleChange} required />
          </div>
          <span className="profile__input-error">{errors.name}</span>
          <div className="profile__string">
            <label className="profile__key" htmlFor="email">E-mail</label>
            <input className="profile__text" id="email" name="email"
              type="email" minLength="2" maxLength="30" value={values.email}
              placeholder={currentUser.email} onChange={handleChange} required />
          </div>
          <span className="profile__input-error">{errors.email}</span>
          <button className="profile__edit" title="Начни вводить данные чтобы активировать кнопку"
            type="submit" disabled={(!isValid || isEqual)}>Редактировать</button>
        </form>
        <button className="profile__exit" onClick={props.signOut}>Выйти из аккаунта</button>
      </main>
    </>
  )
}

export default Profile;