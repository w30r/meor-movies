import { useEffect, useState } from "react";
import { listGenres } from "../services/api";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const loadGenres = async () => {
      const resp = await listGenres();
      setGenres(resp);
      console.log(genres);
    };
    loadGenres();
  }, []);

  return (
    <div className="h-screen ">
      <h1 className="mb-4">Genres</h1>
      <div className="grid text-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.map((x) => (
          <button
            className="hover:scale-105 transition-all duration-300 ease-in-out "
            key={x.id}
          >
            {x.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Genres;
