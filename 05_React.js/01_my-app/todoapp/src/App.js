import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (e) => {
    setTodos(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (todos === "") {
      return;
    }
    setTodos("");
    setToDos((currentArray) => [todos, ...currentArray]);
  };
  console.log(toDos);
  return (
    <div>
      <h1>My TO Dos ({todos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={todos}
          type="text"
          placeholder="Write your to do ..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
