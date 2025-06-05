import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { getMatches, movieDetailbyID } from "../services/api";

function Matches() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [matches, setMatches] = useState([]);
  const [matchedMovies, setMatchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheckMatches() {
    setLoading(true);
    setError(null);
    setMatches([]);
    setMatchedMovies([]);
    try {
      // Use the new getMatches API function
      const data = await getMatches(user1, user2);
      const ids = data.matchedMovieIds || [];
      setMatches(ids);
      // Fetch movie details for each matched movie ID
      const movieDetails = await Promise.all(
        ids.map(async (id) => {
          try {
            return await movieDetailbyID(id);
          } catch {
            return { id, title: `Movie ID: ${id}` };
          }
        })
      );
      setMatchedMovies(movieDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2 pt-4 flex flex-col">
      <h2 className="text-3xl font-bold mb-4 text-center">Find Matches!</h2>
      <form className="flex flex-col sm:flex-row gap-2 mb-4 w-full" onSubmit={e => { e.preventDefault(); if (user1 && user2 && !loading) handleCheckMatches(); }}>
        <input
          type="text"
          placeholder="First username"
          value={user1}
          onChange={e => setUser1(e.target.value)}
          className="border px-2 py-2 rounded w-full"
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (user1 && user2 && !loading) handleCheckMatches(); } }}
        />
        <input
          type="text"
          placeholder="Second username"
          value={user2}
          onChange={e => setUser2(e.target.value)}
          className="border px-2 py-2 rounded w-full"
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (user1 && user2 && !loading) handleCheckMatches(); } }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
          disabled={!user1 || !user2 || loading}
        >
          {loading ? "Checking..." : "Find Matches"}
        </button>
      </form>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {matchedMovies.length > 0 && (
        <div className="mt-4 w-full">
          <h3 className="font-bold mb-2 text-center">Movies both users like:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {matchedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
      {matches.length === 0 && !loading && !error && (
        <p className="text-gray-500 mt-4">No matches to show.</p>
      )}
    </div>
  );
}

export default Matches;
