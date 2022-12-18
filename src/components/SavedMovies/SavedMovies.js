import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  return (
    <>
      <Header />
      <main className="savedMovies">
        <SearchForm
          cards={props.savedCards}
          isSavedShorts={props.isSavedShorts}
          handleIsSavedShorts={props.handleIsSavedShorts}
          handleSavedSearchQuery={props.handleSavedSearchQuery}
          setIsSavedSearched={props.setIsSavedSearched}
        />
        <MoviesCardList
          cards={props.savedCards}
          savedCards={props.savedCards}
          setSavedCards={props.setSavedCards}
          isShorts={props.isSavedShorts}
          savedSearchQuery={props.savedSearchQuery}
          isSearched={props.isSearched}
          isSavedSearched={props.isSavedSearched}
          setIsSavedSearched={props.setIsSavedSearched}
        />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;