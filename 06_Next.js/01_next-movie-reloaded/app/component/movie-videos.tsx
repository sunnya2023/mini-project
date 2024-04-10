import { URL } from "../(home)/page";

async function getVideos(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(`${URL}/${id}/videos`);
  return res.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return <h6>{JSON.stringify(videos)}</h6>;
}
