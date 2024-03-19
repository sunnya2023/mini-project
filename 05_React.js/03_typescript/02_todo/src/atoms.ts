import { get } from "react-hook-form";
import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDO {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDO[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoselector",
  get({ get }) {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
// export const toDoSelector = selector({
//   key: "toDoSelector",
//   get: ({ get }) => {
//     const toDos = get(toDoSelector);
//     return [
//       toDos.filter((todo) => todo.category === "TO_DO"),
//       toDos.filter((todo) => todo.category === "DOING"),
//       toDos.filter((todo) => todo.category === "DONE"),
//     ];
//   },
// });
