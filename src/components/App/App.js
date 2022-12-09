import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/Auth';
import { CurrentUserContext, LoggedInContext } from '../../utils/Context';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import approve from '../../images/approve.png';
import denied from '../../images/denied.png';

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [isOpenSuccessPopup, setIsOpenSuccessPopup] = useState(false);
  const [isOpenDeniedPopup, setIsOpenDeniedPopup] = useState(false);
  const [isServerError, setIsServerError] = useState("");

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleCurrentUser = (data) => {
    setCurrentUser(data);
  }

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

  const [cards, setCards] = useState([]);
  localStorage.setItem('cards', JSON.stringify(cards));

  const handleCards = (data) => {
    setCards(data);
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  const openSuccessPopup = () => {
    setIsOpenSuccessPopup(true);
  }

  const openDeniedPopup = () => {
    setIsOpenDeniedPopup(true);
  }

  const closePopups = () => {
    setIsOpenSuccessPopup(false);
    setIsOpenDeniedPopup(false);
  }

  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt).then((res) => {
          if (res) {
            setCurrentUser({
              name: res.data.name,
              email: res.data.email,
              id: res.data._id
            })
            setLoggedIn(true);
          }
        })
          .catch((err) => {
            console.log(err);
          })
      } else {
        console.log("Нет токена в локальном хранилище");
      }
    }
    tokenCheck();
  }, [loggedIn]);

  const handleLoginSubmit = ({ email, password }) => {
    auth.authorize({ email, password }).then((res) => {
      if (res.token) {
        const jwt = localStorage.getItem('jwt');
        auth.getContent(jwt).then((res) => {
          if (res) {
            setCurrentUser({
              name: res.data.name,
              email: res.data.email,
              id: res.data._id
            })
            setLoggedIn(true);
            localStorage.setItem('loggedIn', loggedIn);
            history.push('/movies');
          } else {
            console.log("Некорректно заполнено одно из полей");
            setIsServerError(res.message);
          }
        })
          .catch((err) => {
            console.log(err);
          })
      }
    })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <LoggedInContext.Provider value={loggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute path="/movies"
              component={Movies}
              handleCards={handleCards}
              cards={cards}
            />
            <ProtectedRoute path="/saved-movies"
              component={SavedMovies}
            />
            <ProtectedRoute path="/profile"
              component={Profile}
              signOut={signOut}
              handleCurrentUser={handleCurrentUser}
              handleOpenSuccessPopup={openSuccessPopup}
              handleOpenDeniedPopup={openDeniedPopup}
            />
            <Route path="/signin">
              <Login handleLoginSubmit={handleLoginSubmit} isServerError={isServerError} />
            </Route>
            <Route path="/signup">
              <Register handleLoginSubmit={handleLoginSubmit} />
            </Route>
            <Route path="*">
              <PageNotFound loggedIn={loggedIn} />
            </Route>
          </Switch>

          <InfoToolTip
            p1="Вы успешно"
            p2="Обновили профиль"
            approve={approve}
            isOpen={isOpenSuccessPopup}
            name="successReg"
            onClose={closePopups} />

          <InfoToolTip
            p1="Что-то пошло не так!"
            p2="Попробуйте ещё раз."
            approve={denied}
            isOpen={isOpenDeniedPopup}
            name="negativeReg"
            onClose={closePopups} />
        </div>
      </CurrentUserContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;
