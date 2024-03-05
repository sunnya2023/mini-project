import React from "react";
import { users } from "../db";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const [readSearchParams, setSearchParams] = useSearchParams();
  // console.log(readSearchParams.has("geo"));
  setTimeout(() => {
    setSearchParams({
      day: "today",
      time: "five",
    });
  }, 3000);
  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
