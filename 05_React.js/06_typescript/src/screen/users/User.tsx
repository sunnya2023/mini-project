import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../../db";

export const User = () => {
  const { userId } = useParams();
  return (
    <div>
      User with id {userId} is named :{users[Number(userId) - 1].name}
      <hr />
      <Link to={"followers"}>See followrs</Link>
      <Outlet 
      context={{ 
        nameOfMyUser: users[Number(userId) - 1].name
        }} />
    </div>
  );
};
