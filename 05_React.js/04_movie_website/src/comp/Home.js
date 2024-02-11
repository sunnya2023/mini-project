import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HiOutlineDocumentText } from "react-icons/hi";
import "./home.css";
const Home = () => {
  return (
    <>
      <div className="main_container">
        <div className="contant">
          <div className="detail">
            <div className="logo">
              <img src="./img/logo5.png" alt="logo" title="logo"></img>
            </div>
            <div className="container">
              <h2>Avengers:Endgame</h2>
              <p>
                Adrift in space with no food or water, Tony Stark sends a
                message to Pepper Potts as his oxygen supply starts to dwindle.
                Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain
                America and Bruce Banner -- must figure out a way to bring back
                their vanquished allies for an epic showdown with Thanos -- the
                evil demigod who decimated the planet and the universe.
              </p>
              <div className="btn">
                <Link to="/" className="play">
                  <BsFillPlayFill className="icon" />
                  Play Now
                </Link>
                <Link to="/" className="movie_detail">
                  <HiOutlineDocumentText className="icon" />
                  Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
