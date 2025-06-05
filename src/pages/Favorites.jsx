import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";

function Favorites() {
  const { favorites } = useMovieContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (favorites.length > 0) {
    return (
      <div className="h-screen ">
        <h1>Your Favorites</h1>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen bg-red-500/20">
      <h1>Your Favorites</h1>
      <p>No favs yet</p>
    </div>
  );
}

export default Favorites;
