import React from "react";
import PropTypes from "prop-types";
import "./App.css";
function ClassMovie({ id, year, title, summary, poster, genres }) {
  return (
    <div className="movie">
      <img src={poster} alt={title} title={title}></img>
      <div className="movie__data">
        <h3 className="movie__title">{title}</h3>
        <h5 className="movie__year">{year}</h5>

        <ul className="movie__genres">
          {genres.map((genres, index) => (
            <li key={index} className="genres__genre">
              {genres}
            </li>
          ))}
        </ul>
        <p className="movie__summary">
          {summary.length > 180 ? summary.slice(0, 140) : summary}...
        </p>
      </div>
    </div>
  );
}

ClassMovie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ClassMovie;
