import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

//c032e2d7
//  3e1683f1

const API_URL = "http://www.omdbapi.com/?apikey=3e1683f1";
function App() {
  const [movies, setMovies] = useState([]);
  const [serchTerm, setSearchTerm] = useState();
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(data.Search);
  };

  useEffect(() => {
    searchMovies("spiderman");
  }, []);

  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className="Search">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={serchTerm}
          type="text"
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(serchTerm);
          }}
        />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
