import { error } from "console";
import { URL } from "../(home)/page";

async function getMovies(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  //   throw new Error("something broke");
  const res = await fetch(`${URL}/${id}`);
  return res.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const info = await getMovies(id);
  return <h6>{JSON.stringify(info)}</h6>;
}
