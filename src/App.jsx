import { Route, Routes } from "react-router-dom";
import "./App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import { MovieProvider } from "./contexts/MovieContext";
import Genres from "./pages/Genres";
import SwipeLogin from "./pages/SwipeLogin";
import SwipeStart from "./pages/SwipeStart";

function App() {
  return (
    <MovieProvider>
      <div className="nav fixed top-0 left-0 w-full bg-white flex items-center justify-center gap-4 z-100 h-10">
        <a href="/">Home</a>
        <a href="/favorites">Favorites</a>
        <a href="/genres">Genres</a>
        <a href="/swipe-login">
          <p className="text-pink-500 font-bold hover:scale-110 transition-all duration-300 ease-in-out">
            Swipe
          </p>
        </a>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/swipe-login" element={<SwipeLogin />} />
        <Route path="/swipe-start/:username" element={<SwipeStart />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;
