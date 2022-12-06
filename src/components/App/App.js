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

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const handleLogin = () => {
    setLoggedIn(true);
  }



  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt).then((res) => {
          if (res) {
            setUserData({
              name: res.data.name,
              email: res.data.email
            })
            handleLogin();
            history.push('/movies');
          }
        })
      }
    }
    tokenCheck();
  }, [history]);

  return (
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
          userData={userData}
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
    </div>
  );
}

export default App;
