import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardLIst";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  return (
    <>
      <Header />
      <main className="savedMovies">
        <SearchForm />
        <MoviesCardList cards={props.savedCards} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;