import Link from "next/link";
import { resolve } from "path";

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
    <div>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}
