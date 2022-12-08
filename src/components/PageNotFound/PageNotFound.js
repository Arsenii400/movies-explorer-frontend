import React from 'react';
import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound (props) {

  const history = useHistory();

  return (
    <main className="not-found">
      <span className='not-found__statusCode'>404</span>
      <h3 className="not-found__title">
       Страница не найдена
      </h3>
      <button className="not-found__return"
      onClick={ props.loggedIn ? () => history.goBack() : () => history.push("/signin") }>Назад</button>
    </main>
  )
}

export default PageNotFound;