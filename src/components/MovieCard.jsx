import { useMovieContext } from "../contexts/MovieContext";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, addToFavorites, isFavorite } =
    useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick() {
    // e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
    console.log(favorites);
  }

  return (
    <div className="relative hover:scale-105 transition duration-300 ease-in-out">
      <div
        onClick={() => navigate(`/detail/${movie.id}`)}
        className="hover:scale-105 hover:shadow-lg hover:border-2 border-white/50 transition duration-300 ease-in-out hover:-translate-y- bg-white/10 p-10 rounded-xl flex flex-col justify-center items-center w-[150px] h-[200px]"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          backgroundPosition: "center",
          // filter: "brightness(80%)",
        }}
      ></div>
      <p className="mt-2 text-sm font-medium bg-black rounded text-white text-center w-[150px] max-h-[25px]">
        {movie.title}
      </p>
      <button
        onClick={() => onFavoriteClick()}
        className={`absolute top-2 left-2 ${favorite ? "active" : ""}`}
      >
        {favorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default MovieCard;
