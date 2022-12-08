export const BASE_URL = 'https://api.nomoreparties.co';

const checkAnswer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export const getFilms = () => {
  return fetch(`${BASE_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(checkAnswer)
}