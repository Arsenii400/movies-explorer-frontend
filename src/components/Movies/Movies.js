import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardLIst";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

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
          setIsLoading={props.setIsLoading}
          setIsSearched={props.setIsSearched}
        />
        { props.isLoading ? <Preloader /> :
        <MoviesCardList
          cards={props.processedCards}
          isShorts={props.isShorts}
          savedCards={props.savedCards}
          handleSavedCards={props.handleSavedCards}
          setSavedCards={props.setSavedCards}
          isSearched={props.isSearched}
        />}
      </main>
      <Footer />
    </>
  )
}

export default Movies;