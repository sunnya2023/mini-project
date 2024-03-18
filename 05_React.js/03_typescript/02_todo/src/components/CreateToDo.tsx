import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onsubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write your to do"
        />
        <button>Add</button>
      </form>
    </>
  );
}

export default CreateToDo;
