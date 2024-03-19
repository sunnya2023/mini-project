import React from "react";
import { IToDO, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDO) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prevToDos) => {
      return prevToDos.map((todo) =>
        todo.id === id ? { ...todo, category: name as any } : todo
      );
    });

    // setToDos((oldTodo) => {
    //   const targetIndex = oldTodo.findIndex((toDo) => toDo.id === id);
    //   const newTodo = { text, id, category: name as IToDO["category"] };
    //   return oldTodo;
    // });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
