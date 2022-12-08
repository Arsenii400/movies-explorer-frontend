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

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [isOpenSuccessPopup, setIsOpenSuccessPopup] = useState(false);
  const [isOpenDeniedPopup, setIsOpenDeniedPopup] = useState(false);

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
            history.push('/movies');
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
  }, [history]);

  return (
    <LoggedInContext.Provider value={loggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>
          <Switch>
            <Route exact path="/">
              <Main loggedIn={loggedIn} />
            </Route>
            <ProtectedRoute path="/movies"
              component={Movies}
              loggedIn={loggedIn}
            />
            <ProtectedRoute path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
            />
            <ProtectedRoute path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              signOut={signOut}
              handleCurrentUser={handleCurrentUser}
              handleOpenSuccessPopup={openSuccessPopup}
              handleOpenDeniedPopup={openDeniedPopup}
            />
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <Register />
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
