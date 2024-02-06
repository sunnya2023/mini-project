import { useEffect, useState } from "react";
import MovieDetail from "../components/moveDetail";
function Home() {
  const [loading, setLoading] = useState();
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const url =
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year";

    const json = await (await fetch(url)).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div>
      {loading ? (
        <h1>Loaing...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <MovieDetail
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
