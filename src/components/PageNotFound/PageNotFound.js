import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoggedInContext } from '../../utils/Context';
import './PageNotFound.css';

function PageNotFound () {

  const history = useHistory();
  const loggedIn = useContext(LoggedInContext);

  return (
    <main className="not-found">
      <span className='not-found__statusCode'>404</span>
      <h3 className="not-found__title">
       Страница не найдена
      </h3>
      <button className="not-found__return"
      onClick={ loggedIn ? () => history.goBack() : () => history.push("/signin") }>Назад</button>
    </main>
  )
}

export default PageNotFound;