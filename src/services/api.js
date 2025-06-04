const API_KEY = "2a69af83e643fe243bc21a1cf7e652fc";
const BASE_URL = "https://api.themoviedb.org/3";
const SERVER_BASE_URL = "https://845c-118-101-171-17.ngrok-free.app";

export async function likeAMovie(movieId, username) {
  const res = await fetch(`${SERVER_BASE_URL}/like`, {
    method: "POST",
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({ movieId, username }),
  });
  return res.json();
}

export const getPopularMovies = async (page) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
  const data = await response.json();
  return data.results;
};

export const movieDetailbyID = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const listGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.genres;
};

export const movieReccs = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`
  );
  const data = await response.json();
  console.log(data);
  return data.results;
};
