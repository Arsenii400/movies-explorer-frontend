import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound () {
  return (
    <div className="not-found">
      <span className='not-found__statusCode'>404</span>
      <h3 className="not-found__title">
       Страница не найдена
      </h3>
      <Link className="not-found__return" to="/">Назад</Link>
    </div>
  )
}

export default PageNotFound;