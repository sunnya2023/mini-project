import { error } from "console";
import { URL } from "../(home)/page";
import styles from "../style/movie-info.module.css";

export async function getMovies(id: string) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  //   throw new Error("something broke");
  const res = await fetch(`${URL}/${id}`);
  return res.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const info = await getMovies(id);
  return (
    <div className={styles.container}>
      <img src={info.poster_path} alt={info.title} className={styles.poster} />
      <div className={styles.info}>
        <h1 className={styles.title}>{info.title}</h1>
        <h3>⭐{info.vote_average.toFixed(1)}</h3>
        <p>{info.overview}</p>
        <a href={info.homepage} target="_black">
          Homepage &rarr;
        </a>
      </div>
    </div>
  );
}
