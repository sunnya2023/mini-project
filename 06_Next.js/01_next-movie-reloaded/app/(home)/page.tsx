import Link from "next/link";
import { resolve } from "path";
import Movie from "../component/movie";
import styles from "../style/home.module.css";

export const metadata = {
  title: "Home",
};

export const URL = `https://nomad-movies.nomadcoders.workers.dev/movies`;

async function getMoivies() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(URL);
  const json = await res.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMoivies();
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
        />
      ))}
    </div>
  );
}
