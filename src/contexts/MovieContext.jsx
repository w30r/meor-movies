import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext({});
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites"); // purpose: get the stored favs
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites)); // if there is stored favs, parse them
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)); // purpose: store the favs
  }, [favorites]);

  const addToFavorites = (movie) => {
    // setFavorites([...favorites, movie]);
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const removeFromFavorites = (movieid) => {
    // setFavorites(favorites.filter((m) => m.id !== movie.id));
    setFavorites((prevFavorites) =>
      prevFavorites.filter((m) => m.id !== movieid)
    );
  };

  const isFavorite = (movieid) => {
    return favorites.some((m) => m.id === movieid); // this wil return true or false
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
