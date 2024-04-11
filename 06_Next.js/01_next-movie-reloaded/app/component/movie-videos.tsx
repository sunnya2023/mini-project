import { URL } from "../(home)/page";
import styles from "../style/move-videos.module.css";

async function getVideos(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(`${URL}/${id}/videos`);
  return res.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return (
    <div className={styles.container}>
      {videos.map((video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          title={video.title}
          allowFullScreen
          allow="accelerometer; encrypted-media ;autoplay;picture-in-picture "
        />
      ))}
    </div>
  );
}
