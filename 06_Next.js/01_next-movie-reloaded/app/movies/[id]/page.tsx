import { Suspense } from "react";
import MovieInfo, { getMovies } from "../../component/movie-info";
import MovieVideos from "../../component/movie-videos";
interface IParams {
  params: { id: string };
}
export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovies(id);
  return {
    title: movie.title,
  };
}

//id라는 파라미터는 MovieDetail컴포넌트에 제공되는 객체임

async function MovieDetail({ params: { id } }: IParams) {
  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

export default MovieDetail;
