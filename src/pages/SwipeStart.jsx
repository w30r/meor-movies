import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPopularMovies, likeAMovie, getUsersPage, listGenres } from "../services/api";

function SwipeStart() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [movieindex, setMovieindex] = useState(0);
  const [page, setPage] = useState(1); // Will be updated by backend on mount
  const [likedMovie, setLikedMovie] = useState([]);
  const [dislikedMovie, setDislikedMovie] = useState([]);
  const [pageLoadError, setPageLoadError] = useState(null);
  const [genreMap, setGenreMap] = useState({});

  // Fetch last page for user on mount
  useEffect(() => {
    async function fetchUserPage() {
      try {
        const currPage = await getUsersPage(username);
        console.log('[SwipeStart] Fetched currPage from server:', currPage);
        if (currPage !== undefined && currPage !== null) {
          setPage(currPage);
        }
      } catch (err) {
        console.error("Failed to fetch user page:", err);
        setPageLoadError("Can't get the saved user's page, loading from page 1 instead");
        setPage(1); // fallback
      }
    }
    fetchUserPage();
  }, [username]);

  // Fetch genre map on mount
  useEffect(() => {
    async function fetchGenres() {
      try {
        const genres = await listGenres();
        const map = {};
        genres.forEach(g => { map[g.id] = g.name; });
        setGenreMap(map);
      } catch (err) {
        setGenreMap({});
      }
    }
    fetchGenres();
  }, []);

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
      const result = await likeAMovie(currentMovie.id, username, page);
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
    console.log('[SwipeStart] useEffect for page:', page);
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(page);
        console.log('[SwipeStart] Loaded movies for page', page, ':', data);
        setMovies(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (page !== undefined && page !== null) {
      loadMovies();
    }
  }, [page]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col px-2 pt-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Start swiping, {username}!</h2>
      {pageLoadError && (
        <p className="text-md text-red-600 mb-2 text-center">{pageLoadError}</p>
      )}
      {loading ? (
        <p className="text-xl text-center">Loading...</p>
      ) : (
        <>
          <div
            className="bg-no-repeat bg-center aspect-[2/3] w-full max-w-xs mx-auto mt-2 rounded-lg text-white flex items-end justify-center shadow-lg overflow-hidden"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movies[movieindex].poster_path})`,
              backgroundSize: 'cover',
            }}
          >
            <p className="text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] bg-black/60 py-1 rounded-b-lg px-3 opacity-90 w-full text-center">
              {movies[movieindex].title}
            </p>
          </div>
          <div className="flex w-full mt-4 gap-4">
            <button
              onClick={handleDislike}
              className="bg-red-400 h-12 flex-1 rounded-lg outline-2 outline-black shadow-xl flex items-center justify-center text-2xl active:scale-95 transition"
              aria-label="Dislike"
            >
              ❌
            </button>
            <button
              onClick={handleLike}
              className="bg-green-400 h-12 flex-1 rounded-lg outline-2 outline-black shadow-xl flex items-center justify-center text-2xl active:scale-95 transition"
              aria-label="Like"
            >
              ✅
            </button>
          </div>
          <p className="mt-4 text-xl font-bold text-center">Show Details</p>
          <p className="font-bold text-center">⬇⬇⬇</p>
          <div>
            <div className="mt-4 p-4 bg-white/80 rounded-lg shadow-xl">
              <p className="font-bold text-lg text-center">
                {movies[movieindex].title} (
                {movies[movieindex].release_date?.slice(0, 4)})
              </p>
              {/* Genre badges with unique colors */}
              <div className="flex flex-wrap gap-2 justify-center my-2">
                {movies[movieindex].genre_ids && movies[movieindex].genre_ids.map((gid) => {
                  const genreName = genreMap[gid];
                  const genreColors = {
                    "Action":      'bg-red-200 text-red-800',
                    "Adventure":   'bg-green-200 text-green-800',
                    "Animation":   'bg-yellow-200 text-yellow-800',
                    "Comedy":      'bg-pink-200 text-pink-800',
                    "Crime":       'bg-gray-300 text-gray-800',
                    "Documentary": 'bg-blue-100 text-blue-900',
                    "Drama":       'bg-purple-200 text-purple-800',
                    "Family":      'bg-teal-200 text-teal-800',
                    "Fantasy":     'bg-indigo-200 text-indigo-800',
                    "History":     'bg-orange-200 text-orange-800',
                    "Horror":      'bg-black text-white',
                    "Music":       'bg-fuchsia-200 text-fuchsia-800',
                    "Mystery":     'bg-slate-200 text-slate-800',
                    "Romance":     'bg-rose-200 text-rose-800',
                    "Science Fiction": 'bg-cyan-200 text-cyan-800',
                    "TV Movie":   'bg-lime-200 text-lime-800',
                    "Thriller":    'bg-amber-200 text-amber-800',
                    "War":         'bg-zinc-200 text-zinc-800',
                    "Western":     'bg-yellow-900 text-yellow-100',
                  };
                  const colorClass = genreColors[genreName] || 'bg-blue-200 text-blue-800';
                  return (
                    <span key={gid} className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold shadow ${colorClass}`}>
                      {genreName}
                    </span>
                  );
                })}
              </div>
              <p className="font-bold text-center">
                Score: {Math.round(movies[movieindex].vote_average * 10) / 10}
                /10
              </p>
              <p className="mt-4 italic text-sm text-gray-700 text-center">{movies[movieindex].overview}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SwipeStart;
