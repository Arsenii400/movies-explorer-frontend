import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardLIst";
import Footer from "../Footer/Footer";

function Movies(props) {
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm handleCards={props.handleCards} />
        <MoviesCardList cards={props.cards} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;