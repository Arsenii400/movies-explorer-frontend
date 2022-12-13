import { BASE_URL } from './constants';

const checkAnswer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export const updateProfile = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  })
    .then(checkAnswer)
}

export const saveMovies = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
      "Accept": "application/json",
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    })
  })
    .then(checkAnswer)
}

export const getMyMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
      "Accept": "application/json",
    }
  })
    .then(checkAnswer)
}

export const deleteMovies = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
      "Accept": "application/json",
    }
  })
    .then(checkAnswer)
}
