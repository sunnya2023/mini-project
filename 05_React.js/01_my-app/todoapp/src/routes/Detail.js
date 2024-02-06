import { useEffect } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const getMoivie = async () => {
    // const json = await (
    //   await fetch(`https://yts.mx/api/v2/movie_details.json?movie _id=${id}`)
    // ).json();
    // console.log(json);

    try {
      const response = await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    getMoivie();
  }, [id]);
  return <h1>Detail</h1>;
}

export default Detail;
