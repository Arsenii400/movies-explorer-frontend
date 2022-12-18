import { BITFILMS_URL } from './constants';

const checkAnswer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export const getFilms = () => {
  return fetch(`${BITFILMS_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(checkAnswer)
}