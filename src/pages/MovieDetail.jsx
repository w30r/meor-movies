import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieDetailbyID, movieReccs } from "../services/api";
import MovieCard from "../components/MovieCard";

function MovieDetail() {
  let { id } = useParams();

  const [movieDetail, setMovieDetail] = useState({});
  const [movieReccsList, setMovieReccsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieDetail = async () => {
      try {
        const data = await movieDetailbyID(id);
        setMovieDetail(data);
        const reccs = await movieReccs(id);
        setMovieReccsList(reccs);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadMovieDetail();
  }, [id]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div>
        {!loading ? (
          <div className="text-sm">
            <h1>{movieDetail.title}</h1>
            <div className="flex gap-4 mt-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                alt={movieDetail.title}
                className="w-1/3 h-1/3 rounded-xl"
              />
              <div className="flex flex-col bg-black/20 border-white/20 shadow-2xl p-8 rounded-xl backdrop-blur-3xl justify-around">
                <p className="text-sm mb-6 italic">{movieDetail.overview}</p>

                <div className="flex flex-col justify-center items-center">
                  <p>Release Date: {movieDetail.release_date?.slice(0, 4)}</p>
                  <p>
                    Rating: {movieDetail.vote_average}/10 (
                    {movieDetail.vote_count} votes)
                  </p>
                  Genres:{" "}
                  {movieDetail.genres.map((genre) => (
                    <p
                      key={genre.id}
                      className="hover:scale-105 transition-all ease-in-out p-1 bg-linear-to-tl from-pink-500 via-red-500 to-yellow-500 border font-medium mt-2 w-1/3 rounded-sm"
                    >
                      {genre.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
      {!loading && (
        <>
          <p className="font-light text-3xl my-4">Check these out</p>
          <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {movieReccsList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
