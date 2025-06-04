import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPopularMovies, likeAMovie } from "../services/api";

function SwipeStart() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [movieindex, setMovieindex] = useState(0);
  const [page, setPage] = useState(1);
  const [likedMovie, setLikedMovie] = useState([]);
  const [dislikedMovie, setDislikedMovie] = useState([]);

  //
  function handleDislike() {
    if (movieindex < 19) {
      setMovieindex(movieindex + 1);
    } else {
      setPage(page + 1);
      setMovieindex(0);
    }
    setDislikedMovie([...dislikedMovie, movies[movieindex].id]);

    console.log("movieindex", movieindex);
    console.log("Disliked Movies: ", dislikedMovie);
  }
  //
  async function handleLike() {
    const currentMovie = movies[movieindex];
    setLikedMovie([...likedMovie, currentMovie.id]);

    try {
      const result = await likeAMovie(currentMovie.id, username);
      if (result.match) {
        alert(
          `🎉 Match! You and ${result.matchedWith.join(", ")} both liked ${
            currentMovie.title
          }`
        );
        // optional: navigate, log, trigger confetti, whatever
      }
    } catch (err) {
      console.error("error liking movie:", err);
    }

    if (movieindex < 19) {
      setMovieindex(movieindex + 1);
    } else {
      setPage(page + 1);
      setMovieindex(0);
    }
  }

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(page);
        setMovies(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [page]);

  return (
    <div className="flex flex-col items-center mx-auto max-w-md">
      <h2 className="text-3xl font-bold">Start swiping, {username}!</h2>
      {loading ? (
        <p className="text-xl">Loading...</p>
      ) : (
        <>
          <div
            className="bg-no-repeat bg-center h-120 w-full mt-6 rounded-sm text-white flex items-center justify-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movies[movieindex].poster_path})`,
            }}
          >
            <p className="text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] bg-black/50 py-0.5 rounded-sm px-3 opacity-80">
              {movies[movieindex].title}
            </p>
          </div>
          <div className="flex justify-between w-full mt-6 gap-4">
            <div
              onClick={() => handleDislike()}
              className="bg-red-400 h-12 w-1/2 rounded-sm outline-2 outline-black shadow-xl flex items-center justify-center"
            >
              ❌
            </div>
            <div
              onClick={() => handleLike()}
              className="bg-green-400 h-12 w-1/2 rounded-sm outline-2 outline-black shadow-xl flex items-center justify-center"
            >
              ✅
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold">Show Details</p>
          <p className="font-bold">⬇⬇⬇</p>
          <div>
            <div className="mt-4 p-4 bg-white/50 rounded-sm shadow-xl">
              <p className="font-bold">
                {movies[movieindex].title} (
                {movies[movieindex].release_date?.slice(0, 4)})
              </p>
              <p className="font-bold">
                Score: {Math.round(movies[movieindex].vote_average * 10) / 10}
                /10
              </p>
              <p className="mt-6 italic">{movies[movieindex].overview}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SwipeStart;
