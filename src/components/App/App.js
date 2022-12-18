import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
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
import * as mainApi from '../../utils/MainApi';
import { CurrentUserContext, LoggedInContext } from '../../utils/Context';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import approve from '../../images/approve.png';
import denied from '../../images/denied.png';

function App() {
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('loggedIn')));
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [isOpenSuccessPopup, setIsOpenSuccessPopup] = useState(false);
  const [isOpenDeniedPopup, setIsOpenDeniedPopup] = useState(false);
  const [isServerError, setIsServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCurrentUser = (data) => {
    setCurrentUser(data);
  }

  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('originalCards');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('isShorts');
    localStorage.removeItem('processedCards');
    localStorage.removeItem('savedCards');
    setLoggedIn(false);
    localStorage.setItem('loggedIn', false)
    setSearchQuery("");
    setProcessedCards([]);
    setIsShorts(false);
    history.push('/');
  }

  const [originalCards, setOriginalCards] = useState([]);
  localStorage.setItem('originalCards', JSON.stringify(originalCards));

  const handleOriginalCards = (data) => {
    setOriginalCards(data);
    localStorage.setItem('originalCards', JSON.stringify(originalCards));
  }

  const [isSearched, setIsSearched] = useState(false);

  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || "");
  localStorage.setItem('searchQuery', searchQuery);

  const handleSearchQuery = (data) => {
    setSearchQuery(data);
    localStorage.setItem('searchQuery', searchQuery);
  }

  const [isShorts, setIsShorts] = useState(JSON.parse(localStorage.getItem('isShorts')));
  localStorage.setItem('isShorts', isShorts);


  const handleIsShorts = (e) => {
    setIsShorts(e.target.checked);
    localStorage.setItem('isShorts', e.target.checked);
  }

  const [processedCards, setProcessedCards] = useState(
    JSON.parse(localStorage.getItem('processedCards')) || []);
  localStorage.setItem('processedCards', JSON.stringify(processedCards));

  const handleProcessedCards = (data, keyword) => {
    localStorage.setItem('processedCards',
      JSON.stringify(data.filter((card) => {
        return card.nameRU.toLowerCase().includes(keyword.trim().toLowerCase());
      })));
    setProcessedCards(JSON.parse(localStorage.getItem('processedCards')));
  }

  const [savedCards, setSavedCards] = useState(JSON.parse(localStorage.getItem('savedCards')) || []);

  const handleSavedCards = (item) => {
    setSavedCards([...savedCards, item])
    localStorage.setItem('savedCards', JSON.stringify([...savedCards, item]));
  }

  const [isSavedSearched, setIsSavedSearched] = useState(false);

  const [savedSearchQuery, setSavedSearchQuery] = useState("");

  const handleSavedSearchQuery = (value) => {
    setSavedSearchQuery(value);
  }

  const [isSavedShorts, setIsSavedShorts] = useState(false);

  const handleIsSavedShorts = (e) => {
    setIsSavedShorts(e.target.checked)
  }

  const findMyCards = () => {
    mainApi.getMyMovies()
      .then((res) => {
        setSavedCards(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
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
          if (res.data) {
            setCurrentUser({
              name: res.data.name,
              email: res.data.email,
              id: res.data._id
            })
            setLoggedIn(true);
            localStorage.setItem('loggedIn', loggedIn);
            findMyCards();
          }
        })
          .catch((err) => {
            setLoggedIn(false);
            localStorage.setItem('loggedIn', false);
            signOut();
            console.log(err);
          })
      } else {
        console.log("Нет токена в локальном хранилище");
        setLoggedIn(false);
        localStorage.setItem('loggedIn', false);
      }
    }
    tokenCheck();
  }, [loggedIn]);

  const handleLoginSubmit = ({ email, password }) => {
    auth.authorize({ email, password })
      .then((res) => {
        if (res.token) {
          const jwt = localStorage.getItem('jwt');
          auth.getContent(jwt)
            .then((res) => {
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
        } else {
          setIsServerError(res.message);
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
              originalCards={originalCards}
              handleOriginalCards={handleOriginalCards}
              handleSearchQuery={handleSearchQuery}
              handleProcessedCards={handleProcessedCards}
              processedCards={processedCards}
              searchQuery={searchQuery}
              handleIsShorts={handleIsShorts}
              isShorts={isShorts}
              savedCards={savedCards}
              handleSavedCards={handleSavedCards}
              setSavedCards={setSavedCards}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isSearched={isSearched}
              setIsSearched={setIsSearched}
            />
            <ProtectedRoute path="/saved-movies"
              component={SavedMovies}
              savedCards={savedCards}
              setSavedCards={setSavedCards}
              isSavedShorts={isSavedShorts}
              handleIsSavedShorts={handleIsSavedShorts}
              handleSavedSearchQuery={handleSavedSearchQuery}
              savedSearchQuery={savedSearchQuery}
              setSavedSearchQuery={setSavedSearchQuery}
              isSavedSearched={isSavedSearched}
              setIsSavedSearched={setIsSavedSearched}
            />
            <ProtectedRoute path="/profile"
              component={Profile}
              signOut={signOut}
              handleCurrentUser={handleCurrentUser}
              handleOpenSuccessPopup={openSuccessPopup}
              handleOpenDeniedPopup={openDeniedPopup}
            />
            <Route path="/signin">
              {
                loggedIn ?
                  <Redirect to="/" /> :
                  <Login handleLoginSubmit={handleLoginSubmit} isServerError={isServerError} />
              }
            </Route>
            <Route path="/signup">
              {
                loggedIn ?
                  <Redirect to="/" /> :
                  <Register handleLoginSubmit={handleLoginSubmit} />
              }
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
