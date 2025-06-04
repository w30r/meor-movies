import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getPopularMovies(page);
        setMovies(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [page]);

  const handleSearch = async () => {
    if (search === "") {
      setPage(null);
      setPage(1);
      return;
    }
    setLoading(true);
    try {
      const data = await searchMovies(search);
      setMovies(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home  ">
      <h1 className="">Meor Movies</h1>
      <h3 className="">Select a movie to add to your favorites</h3>

      <div>
        <input
          type="text"
          className="py-1 px-4 my-4 bg-black/60 rounded-lg text-white focus:outline-none placeholder:text-white"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={() => handleSearch()}
          className="py-1 px-4 my-4 bg-black/60 rounded-lg text-white h-fit ml-4"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4  gap-4 justify-items-center">
        {loading ? (
          <div className="col-span-4 grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-black/60 rounded-lg p-4 w-full h-52 flex items-center justify-center"
              >
                <div className="h-40 w-28 bg-gray-600 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
      <div className="BTN-DIV pt-6 text-white">
        <button
          className=""
          onClick={() => setPage(page - 1)}
          disabled={loading || page === 1}
        >
          Previous page
        </button>
        <button
          className="ml-4"
          onClick={() => setPage(page + 1)}
          disabled={loading}
        >
          Next page
        </button>
      </div>
    </div>
  );
}

export default Home;
