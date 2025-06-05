const API_KEY = "2a69af83e643fe243bc21a1cf7e652fc";
const BASE_URL = "https://api.themoviedb.org/3";
const SERVER_BASE_URL = "https://termination-webshots-vampire-flexible.trycloudflare.com";


export async function getUsersPage(username) {
  const response = await fetch(`${SERVER_BASE_URL}/pagefor/${username}`);
  const data = await response.json();
  return data.currPage;
}

export async function likeAMovie(movieId, username,currPage) {
  const res = await fetch(`${SERVER_BASE_URL}/like`, {
    method: "POST",
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({ movieId, username, currPage }),
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

export async function getMatches(user1, user2) {
  const response = await fetch(`${SERVER_BASE_URL}/get-matches/${encodeURIComponent(user1)}/${encodeURIComponent(user2)}`);
  if (!response.ok) throw new Error("Failed to fetch matches");
  return response.json();
}

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
