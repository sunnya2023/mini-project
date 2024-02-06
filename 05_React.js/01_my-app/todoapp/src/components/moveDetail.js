// import { useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
function MovieDetail({ id, coverImg, title, summary, genres }) {
  return (
    <div>
      <img src={coverImg}></img>
      <h2>
        <Link to={`/movie/:${id}`}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

MovieDetail.prototype = {
  id: ProtoTypes.number.isRequired,
  coverImg: ProtoTypes.string.isRequired,
  title: ProtoTypes.string.isRequired,
  summary: ProtoTypes.string.isRequired,
  genres: ProtoTypes.arrayOf(ProtoTypes.string).isRequired,
};
export default MovieDetail;
