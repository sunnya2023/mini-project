import React from "react";
import { useOutletContext } from "react-router-dom";

interface FollowersContext {
  nameOfMyUser: string;
}

const Followers = () => {
  const { nameOfMyUser } = useOutletContext<FollowersContext>();
  return (
    <div>
      <h1>Here are {nameOfMyUser}의 followers </h1>
    </div>
  );
};

export default Followers;
