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
        <SearchForm
          handleOriginalCards={props.handleOriginalCards}
          handleSearchQuery={props.handleSearchQuery}
          handleProcessedCards={props.handleProcessedCards}
          searchQuery={props.searchQuery}
          handleIsShorts={props.handleIsShorts}
          isShorts={props.isShorts}
        />
        <MoviesCardList cards={props.processedCards} isShorts={props.isShorts} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;