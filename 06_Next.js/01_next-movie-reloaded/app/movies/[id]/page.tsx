import { Suspense } from "react";
import MovieInfo from "../../component/movie-info";
import MovieVideos from "../../component/movie-videos";

async function MovieDetail({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <h1>Movie Detail Page</h1>
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
