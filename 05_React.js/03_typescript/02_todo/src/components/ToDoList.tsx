import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);

  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(category);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />

      <select value={category} onInput={onInput}>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DONE}>Done</option>
      </select>

      <CreateToDo />
      {toDos?.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
      {/* <ul>
        {toDos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul> */}

      {/* <h2>Doing</h2>
      <ul>
        {doing.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr /> */}
    </div>
  );
};
export default ToDoList;

// import { useForm } from "react-hook-form";

// interface IFormData {
//   email: string;
//   firstName: string;
//   lastName: string;
//   password: string;
//   password1: string;
//   extraError?: string;
// }

// const ToDoList = () => {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IFormData>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   const onValid = (data: IFormData) => {
//     if (data.password !== data.password1) {
//       setError(
//         "password1",
//         { message: "password are not the same" },
//         { shouldFocus: true }
//       );
//     }
//     // setError("extraError", { message: "server offline" });
//   };
//   console.log(errors);
//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register("email", {
//             required: "only @naver.com emails allowed",
//             pattern: /^[A-Za-z0-9._%+-]+@naver.com$/,
//           })}
//           placeholder="email"
//         />
//         <span>{errors?.email?.message}</span>
//         <input
//           {...register("firstName", {
//             required: "first name is required",
//             validate: {
//               noNico: (value) =>
//                 value.includes("nico") ? "no nicos allowed" : true,
//               noNick: (value) =>
//                 value.includes("nick") ? "no nick allowed" : true,
//             },
//             minLength: 5,
//           })}
//           placeholder="firstName"
//         />
//         <span>{errors?.firstName?.message}</span>

//         <input
//           {...register("lastName", { required: "Write here", minLength: 2 })}
//           placeholder="lastName"
//         />
//         <span>{errors?.lastName?.message}</span>

//         <input
//           {...register("password", {
//             required: true,
//             minLength: {
//               value: 5,
//               message: "Your password is too short",
//             },
//           })}
//           placeholder="password"
//         />
//         <span>{errors?.password?.message}</span>

//         <input
//           {...register("password1", { required: true })}
//           placeholder="password1"
//         />
//         <span>{errors?.password1?.message}</span>

//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// };

// export default ToDoList;
